# ==============================================================================
# SCRIPT DE RESPALDO POWERSHELL - CGR SEGURA (MariaDB Docker)
# ==============================================================================

# 1. Configuracion
$BackupPath = "./backups"
$ContainerName = "cgr-lms-mariadb"
$MaxBackups = 30

# Crear carpeta de respaldos si no existe
if (!(Test-Path $BackupPath)) {
    New-Item -ItemType Directory -Path $BackupPath
}

# 2. Cargar variables desde .env
$DbName = "cgr_lms"
$DbUser = "root"
$DbPass = $null

$EnvPath = ""
if (Test-Path ".env") { $EnvPath = ".env" }
elseif (Test-Path "../.env") { $EnvPath = "../.env" }

if ($EnvPath) {
    Get-Content $EnvPath | Where-Object { $_ -match "^[^#].+=.+" } | ForEach-Object {
        $key, $value = $_.Split('=', 2)
        if ($key.Trim() -eq "DB_NAME") { $DbName = $value.Trim() }
        if ($key.Trim() -eq "MYSQL_ROOT_PASSWORD") { $DbPass = $value.Trim() }
    }
}

if ([string]::IsNullOrWhiteSpace($DbName) -or [string]::IsNullOrWhiteSpace($DbPass)) {
    Write-Host "ERROR: Faltan variables de base de datos en el archivo .env (DB_NAME, MYSQL_ROOT_PASSWORD)"
    exit
}

# 3. Calcular Correlativo
$NextNumber = 1
$ExistingBackups = Get-ChildItem -Path $BackupPath -Filter "*_respaldo_*.sql"
if ($ExistingBackups) {
    $LastNumber = $ExistingBackups | ForEach-Object { if ($_.Name -match "^(\d+)_") { [int]$matches[1] } } | Sort-Object -Descending | Select-Object -First 1
    if ($LastNumber) { $NextNumber = $LastNumber + 1 }
}
$Prefix = $NextNumber.ToString("0000")

$Timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$FileName = "${Prefix}_respaldo_${DbName}_${Timestamp}.sql"
$FullBackupPath = Join-Path $BackupPath $FileName

Write-Host "------------------------------------------------------------"
Write-Host "Iniciando respaldo de base de datos: $DbName"

# 3. Ejecutar mariadb-dump dentro del contenedor
# Usamos cmd /c para realizar un redireccionamiento binario puro y evitar que PowerShell altere los acentos
try {
    $Command = "docker exec $ContainerName mariadb-dump -h 127.0.0.1 -u $DbUser -p$DbPass $DbName > `"$FullBackupPath`""
    cmd /c $Command
    
    if (Test-Path $FullBackupPath) {
        Write-Host "Respaldo de BD completado exitosamente."
        
        # 4. Respaldar carpeta de uploads
        $UploadsPath = ""
        if (Test-Path "../uploads") { $UploadsPath = "../uploads" }
        elseif (Test-Path "uploads") { $UploadsPath = "uploads" }

        if ($UploadsPath) {
            Write-Host "Respaldando carpeta de uploads..."
            $UploadsFileName = "${Prefix}_respaldo_uploads_${Timestamp}.zip"
            $FullUploadsZipPath = Join-Path $BackupPath $UploadsFileName
            Compress-Archive -Path $UploadsPath -DestinationPath $FullUploadsZipPath -Force
            Write-Host "Respaldo de uploads completado: $FullUploadsZipPath"
        }

        # 5. Limpieza de respaldos antiguos
        Write-Host "Limpiando respaldos antiguos (manteniendo ultimos $MaxBackups)..."
        
        # BD
        $OldBackups = Get-ChildItem -Path $BackupPath -Filter "*_respaldo_${DbName}_*.sql" | 
        Sort-Object LastWriteTime -Descending | 
        Select-Object -Skip $MaxBackups
        
        if ($OldBackups) {
            $OldBackups | Remove-Item -Force
            Write-Host "Se eliminaron $($OldBackups.Count) respaldos de BD antiguos"
        }

        # Uploads
        $OldUploadBackups = Get-ChildItem -Path $BackupPath -Filter "*_respaldo_uploads_*.zip" | 
        Sort-Object LastWriteTime -Descending | 
        Select-Object -Skip $MaxBackups
        
        if ($OldUploadBackups) {
            $OldUploadBackups | Remove-Item -Force
            Write-Host "Se eliminaron $($OldUploadBackups.Count) respaldos de uploads antiguos"
        }
    }
}
catch {
    Write-Host "ERROR: No se pudo realizar el respaldo de la base de datos."
}

Write-Host "Proceso finalizado."
Write-Host "------------------------------------------------------------"
