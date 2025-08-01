# Plan de Desarrollo: Mini CRM para Clínicas

---

## Fase 1: Configuración y Backend Inicial

### 1.1. **Configuración del Entorno de Desarrollo**

    - 1.1.1. Verificar y asegurar la correcta instalación de Node.js, npm/yarn, y las dependencias globales. (Ready)
    - 1.1.2. Configurar linters (ESLint) y formateadores (Prettier) para mantener un código consistente.(Ready)
    - 1.1.3. Establecer scripts en `package.json` para tareas comunes (dev, build, test).

### 1.2. **Módulo de Autenticación y Usuarios (Backend)**

    - 1.2.1. **Diseño del Modelo de Datos:**
        - 1.2.1.1. Crear la entidad `User` (id, nombre, email, password, rol).
        - 1.2.1.2. Definir los roles: `Admin`, `Recepcionista`, `Profesional`.
    - 1.2.2. **Implementación de la Lógica de Autenticación:**
        - 1.2.2.1. Crear endpoints para registro (`/auth/register`) y login (`/auth/login`).
        - 1.2.2.2. Implementar JWT (JSON Web Tokens) para la gestión de sesiones.
        - 1.2.2.3. Añadir guardias de autenticación para proteger rutas.
    - 1.2.3. **Gestión de Usuarios (CRUD):**
        - 1.2.3.1. Desarrollar endpoints para crear, leer, actualizar y eliminar usuarios (solo para `Admin`).

### 1.3. **Módulo de Pacientes (Backend)**

    - 1.3.1. **Diseño del Modelo de Datos:**
        - 1.3.1.1. Crear la entidad `Paciente` (id, nombre, DNI, contacto, obra social, fecha de nacimiento, alergias).
    - 1.3.2. **Implementación del CRUD de Pacientes:**
        - 1.3.2.1. Desarrollar endpoints para registrar, buscar, actualizar y eliminar pacientes.
        - 1.3.2.2. Asegurar que solo roles autorizados (Admin, Recepcionista) puedan gestionar pacientes.

---

## Fase 2: Desarrollo del Frontend y Expansión del Backend

### 2.1. **Módulo de Turnos y Agenda (Backend)**

    - 2.1.1. **Diseño del Modelo de Datos:**
        - 2.1.1.1. Crear la entidad `Turno` (id, fecha, hora, pacienteId, profesionalId, estado).
    - 2.1.2. **Implementación de la Lógica de Turnos:**
        - 2.1.2.1. Desarrollar endpoints para crear, reprogramar y cancelar turnos.
        - 2.1.2.2. Implementar la lógica para consultar la disponibilidad de los profesionales.

### 2.2. **Módulo de Historias Clínicas (Backend)**

    - 2.2.1. **Diseño del Modelo de Datos:**
        - 2.2.1.1. Crear la entidad `HistoriaClinica` (id, pacienteId).
        - 2.2.1.2. Crear la entidad `Evolucion` (id, historiaClinicaId, fecha, descripción, receta).
    - 2.2.2. **Implementación de la Lógica de Historias Clínicas:**
        - 2.2.2.1. Desarrollar endpoints para añadir una nueva evolución a una historia clínica.
        - 2.2.2.2. Asegurar que solo los profesionales puedan modificar las historias clínicas de sus pacientes asignados.

### 2.3. **Desarrollo del Frontend (Next.js)**

    - 2.3.1. **Configuración Inicial del Frontend:**
        - 2.3.1.1. Estructurar el proyecto: componentes, páginas, servicios, estilos.
        - 2.3.1.2. Implementar un sistema de enrutamiento protegido.
    - 2.3.2. **Interfaz de Autenticación:**
        - 2.3.2.1. Crear las vistas de Login y Registro.
        - 2.3.2.2. Conectar con los endpoints del backend.
    - 2.3.3. **Interfaz de Gestión de Pacientes:**
        - 2.3.3.1. Crear la vista para listar y buscar pacientes.
        - 2.3.3.2. Implementar formularios para registrar y editar pacientes.

---

## Fase 3: Funcionalidades Avanzadas y Despliegue

### 3.1. **Dashboard (Backend y Frontend)**

    - 3.1.1. **Backend:**
        - 3.1.1.1. Crear un endpoint que agregue datos clave (turnos del día, pacientes nuevos).
    - 3.1.2. **Frontend:**
        - 3.1.2.1. Diseñar y desarrollar el componente del Dashboard para visualizar las métricas.

### 3.2. **Integración del Calendario (Frontend)**

    - 3.2.1. Implementar una librería de calendario (ej. FullCalendar) para la visualización de turnos.
    - 3.2.2. Conectar el calendario con los endpoints de turnos para mostrar, crear y modificar citas.

### 3.3. **Pruebas y Despliegue**

    - 3.3.1. **Pruebas Unitarias e Integración:**
        - 3.3.1.1. Escribir pruebas para los servicios y controladores críticos del backend.
        - 3.3.1.2. Escribir pruebas para los componentes clave del frontend.
    - 3.3.2. **Despliegue:**
        - 3.3.2.1. Preparar la configuración para un entorno de producción.
        - 3.3.2.2. Desplegar el backend y el frontend en una plataforma (ej. Vercel, AWS).
