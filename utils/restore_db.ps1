# ==============================================================================
# SCRIPT DE RESTAURACION POWERSHELL - CGR SEGURA (MariaDB Docker)
# ==============================================================================

# 1. Configuracion
$BackupPath = "./backups"
$ContainerName = "cgr-lms-mariadb"

# 2. Cargar variables desde .env
$DbName = $null
$DbUser = "root"
$DbPass = $null

$EnvPath = ""
if (Test-Path ".env") { $EnvPath = ".env" }
elseif (Test-Path "../.env") { $EnvPath = "../.env" }

if ($EnvPath) {
    Get-Content $EnvPath | Where-Object { $_ -match "^[A-Z_]+=.+" } | ForEach-Object {
        $parts = $_.Split('=', 2)
        $key = $parts[0].Trim()
        $val = $parts[1].Trim()
        if ($key -eq "DB_NAME") { $DbName = $val }
        if ($key -eq "MYSQL_ROOT_PASSWORD") { $DbPass = $val }
    }
}

if ([string]::IsNullOrWhiteSpace($DbName) -or [string]::IsNullOrWhiteSpace($DbPass)) {
    Write-Host "ERROR: Faltan variables de base de datos en el archivo .env (DB_NAME, MYSQL_ROOT_PASSWORD)"
    exit
}

Write-Host "------------------------------------------------------------"
Write-Host "Iniciando proceso de restauracion..."

# 3. Buscar el respaldo mas reciente (.sql)
$LatestBackup = Get-ChildItem -Path $BackupPath -Filter "*_respaldo_${DbName}_*.sql" | 
Sort-Object LastWriteTime -Descending | 
Select-Object -First 1

if ($null -eq $LatestBackup) {
    Write-Host "ERROR: No se encontro ningun archivo de respaldo en $BackupPath"
    Write-Host "------------------------------------------------------------"
    exit
}

Write-Host "Archivo detectado: $($LatestBackup.FullName)"

# 4. Restaurar el archivo
try {
    # Usamos cmd /c para bypass de PowerShell Pipeline y asegurar que el binario fluya directo
    # No usamos -h para que conecte por socket local dentro del contenedor
    $Command = "type `"$($LatestBackup.FullName)`" | docker exec -i $ContainerName mariadb -u $DbUser -p$DbPass $DbName"
    cmd /c $Command
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Restauracion completada exitosamente."
    } else {
        Write-Host "ERROR: MariaDB retorno el codigo de error $LASTEXITCODE"
    }
}
catch {
    Write-Host "ERROR: Ocurrio un problema critico durante la restauracion."
    Write-Host $_.Exception.Message
}

Write-Host "------------------------------------------------------------"
