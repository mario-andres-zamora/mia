# Módulo 2: Protección de Datos Personales

## Estructura del Módulo
Este módulo aborda el marco jurídico y las responsabilidades éticas en el tratamiento de datos personales, fundamentado en la **Constitución Política de Costa Rica** y la **Ley N° 8968**. Se enfoca en garantizar el derecho a la **autodeterminación informativa** de los ciudadanos cuyos datos son procesados por la CGR.

---

### Lección 1: Fundamentos y Definiciones
**Tipo de Lección:** Lectura (reading)
**Descripción:** Conceptos clave basados en el Artículo 3 de la Ley 8968 y la base constitucional.

| Título | Tipo de Contenido | Datos (JSON Structure) | Puntos | Requerido | Tiempo Est. |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Base Constitucional | `heading` | `{"text": "El Derecho a la Intimidad (Art. 24 CP)"}` | 0 | No | 0 min |
| Autodeterminación Informativa | `text` | `{"text": "Derecho fundamental (Art. 4 Ley 8968) que faculta a toda persona a controlar el flujo de sus datos personales y evitar su uso discriminatorio o no autorizado."}` | 10 | No | 2 min |
| Clasificación de Datos | `bullets` | `{"items": ["**Acceso Irrestricto:** Datos en bases públicas generales (Nombre, Cédula, Cargo).", "**Acceso Restringido:** Datos de interés para el titular o la Administración (Domicilio, Correo personal).", "**Datos Sensibles:** Información del fuero íntimo (Salud, Orientación sexual, Religión, Origen racial). **Su tratamiento está prohibido** salvo excepciones legales." ]}` | 15 | Sí | 4 min |
| Deber de Confidencialidad | `note` | `{"text": "Obligación legal (Art. 11 Ley 8968) que perdura incluso después de finalizada la relación laboral con la institución."}` | 5 | No | 1 min |

---

### Lección 2: Ciclo de Vida y Calidad de la Información
**Tipo de Lección:** Lectura (reading)
**Descripción:** Principios rectores para asegurar que los datos sean exactos y veraces (Art. 6 Ley 8968).

| Título | Tipo de Contenido | Datos (JSON Structure) | Puntos | Requerido | Tiempo Est. |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Calidad del Dato | `heading` | `{"text": "Actualidad, Veracidad y Exactitud"}` | 0 | No | 0 min |
| Principio de Actualidad | `text` | `{"text": "Los datos deben ser actuales. La ley establece un plazo general de conservación de **10 años** desde la ocurrencia de los hechos, tras lo cual deben ser eliminados o desasociados."}` | 15 | No | 3 min |
| Adecuación al Fin | `text` | `{"text": "Los datos solo pueden ser recolectados para fines determinados, explícitos y legítimos. No pueden tratarse posteriormente de manera incompatible con dichos fines (Art. 6.4)."}` | 15 | Sí | 3 min |
| Consentimiento Informado | `text` | `{"text": "Es obligatorio informar al titular sobre la existencia de la base, el fin de la recolección y sus derechos. El consentimiento debe ser **expreso y por escrito** (físico o electrónico)."}` | 20 | Sí | 4 min |

---

### Lección 3: Gestión de Derechos ARCO
**Tipo de Lección:** Interactiva (interactive)
**Descripción:** Procedimientos para atender las solicitudes de los ciudadanos (Art. 7 Ley 8968).

| Título | Tipo de Contenido | Datos (JSON Structure) | Puntos | Requerido | Tiempo Est. |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Derechos del Titular | `heading` | `{"text": "Protocolo de Atención ARCO"}` | 0 | No | 0 min |
| Acceso y Rectificación | `bullets` | `{"items": ["**Acceso:** Obtener confirmación de la existencia de sus datos en un plazo máximo de **5 días hábiles**.", "**Rectificación:** Actualizar o corregir datos inexactos o incompletos." ]}` | 15 | No | 4 min |
| Supresión y Oposición | `bullets` | `{"items": ["**Supresión (Cancelación):** Eliminar datos tratados en infracción a la ley o fuera del plazo de 10 años.", "**Oposición:** Negarse al tratamiento por razones legítimas y fundadas." ]}` | 15 | No | 4 min |
| Excepciones Legales | `text` | `{"text": "El derecho a la autodeterminación puede limitarse por: Seguridad del Estado, Autoridad Pública en ejercicio, o Prevención de delitos (Art. 8)."}` | 10 | No | 2 min |
| Desafío Legal | `multiple_choice` | `{"question": "¿Cuál es el plazo legal para resolver una solicitud de acceso a datos?", "options": ["3 días", "5 días hábiles", "15 días naturales"], "answer": 1}` | 25 | Sí | 5 min |

---

### Lección 4: Seguridad y Sanciones en la CGR
**Tipo de Lección:** Práctica (assignment)
**Descripción:** Medidas de protección y consecuencias del incumplimiento.

| Título | Tipo de Contenido | Datos (JSON Structure) | Puntos | Requerido | Tiempo Est. |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Medidas de Seguridad | `heading` | `{"text": "Seguridad Técnica y Organizativa (Art. 10)"}` | 0 | No | 0 min |
| Protección en CGR | `text` | `{"text": "Debemos adoptar mecanismos de seguridad física y lógica para evitar la alteración, pérdida o acceso no autorizado. Esto incluye el uso correcto de credenciales y encriptación."}` | 20 | No | 3 min |
| Régimen Sancionatorio | `bullets` | `{"items": ["**Faltas Leves:** Recolección sin información suficiente.", "**Faltas Graves:** Tratamiento sin consentimiento expreso.", "**Faltas Gravísimas:** Tratamiento de datos sensibles por entidades privadas o revelación de secretos obligados por ley." ]}` | 20 | No | 4 min |
| Confirmación Ética | `confirmation` | `{"text": "He comprendido que el deber de confidencialidad es permanente y me comprometo a aplicar los principios de la Ley 8968 en todas mis funciones dentro de la CGR."}` | 30 | Sí | 2 min |

---

## Recursos Adicionales Sugeridos
- [PDF] Constitución Política de Costa Rica (Art. 24).
- [PDF] Ley N° 8968 - Protección de la Persona frente al Tratamiento de sus Datos Personales.
- [Link] Agencia de Protección de Datos de los Habitantes (PRODHAB).
