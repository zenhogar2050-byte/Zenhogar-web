# ZENHOGAR - Sistema de Ventas

Este proyecto es un sistema de embudo de ventas para productos de bienestar natural, diseñado para operar tanto en entornos de desarrollo como en producción.

## Requisitos Previos

- **Node.js**: Versión 18 o superior.
- **npm**: Gestor de paquetes de Node.js.

## Configuración

1.  **Clonar o Descargar**: Descarga los archivos del proyecto en tu máquina local.
2.  **Instalar Dependencias**:
    ```bash
    npm install
    ```
3.  **Variables de Entorno**: Crea un archivo `.env` en la raíz del proyecto basándote en el archivo `.env.example`.
    ```bash
    cp .env.example .env
    ```
    Configura las siguientes variables en tu archivo `.env`:
    - `GOOGLE_SHEETS_ORDERS_WEBHOOK`: URL de tu Aplicación Web de Google Apps Script.
    - `SHEETS_SECURITY_TOKEN`: Token de seguridad (debe coincidir con el que pusiste en el script de Google).

## Ejecución en Desarrollo

Para ejecutar el proyecto en modo desarrollo con recarga en caliente:
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`.

## Ejecución en Producción

Para preparar y ejecutar la aplicación en un entorno de producción:

1.  **Construir el Frontend**:
    ```bash
    npm run build
    ```
2.  **Iniciar el Servidor**:
    ```bash
    npm start
    ```

## Integración con Google Sheets

Para que los pedidos lleguen a Google Sheets:
1.  Crea una nueva Hoja de Cálculo de Google.
2.  Ve a **Extensiones** > **Apps Script**.
3.  Copia y pega el contenido del archivo `GOOGLE_SHEETS_SCRIPT.gs` (incluido en este proyecto).
4.  **Implementar**: Haz clic en *Nueva implementación* > *Aplicación web*.
    - Ejecutar como: 'Yo'.
    - Quién tiene acceso: 'Cualquier persona'.
5.  Copia la URL resultante y ponla en tu archivo `.env` bajo `GOOGLE_SHEETS_ORDERS_WEBHOOK`.

## Estructura del Proyecto

- `/src`: Código fuente del frontend (React + Vite).
- `/server.ts`: Servidor Express que maneja las APIs y sirve el frontend.
- `/dist`: Carpeta generada después de `npm run build` con los archivos optimizados para producción.
