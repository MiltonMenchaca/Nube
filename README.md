# TiendaNext

Tienda en línea desarrollada con Next.js, React y TypeScript.

## Despliegue en GitHub Pages

Este proyecto está configurado para desplegarse automáticamente en GitHub Pages. Para configurar el despliegue:

1. Ve a la configuración de tu repositorio en GitHub
2. Navega a "Pages" en el menú lateral
3. En "Build and deployment":
   - Source: Selecciona "GitHub Actions"
   - Branch: Selecciona "main"

## Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar servidor de producción
npm run start
```

## Tecnologías Utilizadas

- Next.js 15.3.0
- React 19
- TypeScript
- MongoDB
- Tailwind CSS

## Estructura del Proyecto

```
src/
├── app/            # Rutas y páginas de la aplicación
├── components/     # Componentes reutilizables
├── models/         # Modelos de datos para MongoDB
├── lib/            # Utilidades y funciones auxiliares
├── data/           # Datos estáticos/iniciales
└── middleware.ts   # Middleware de la aplicación
```

## Características

- 📋 Lista de productos
- 🔍 Detalles de producto individual 
- ✏️ Edición de productos
- ❌ Eliminación de productos
- ➕ Agregar nuevos productos
- 💾 Almacenamiento en MongoDB
- 🔄 Modo offline con localStorage como respaldo

## Requisitos previos

- Node.js 18.0.0 o superior
- MongoDB (para desarrollo local)
- Cuenta en Railway (para despliegue)

## Configuración local

1. Clona este repositorio
```bash
git clone <url-de-tu-repositorio>
cd my-app
```

2. Crea un archivo `.env.local` con las siguientes variables:
```
MONGODB_URI=mongodb://localhost:27017/tiendanext
BASE_URL=http://localhost:3000
```

4. Inicia el servidor de desarrollo
```bash
npm run dev
```

## Cómo desplegar en Railway

### Paso 1: Prepara tu proyecto para Railway

1. Asegúrate de que tu proyecto esté en GitHub.
2. Comprueba que tu aplicación funciona correctamente en local.

### Paso 2: Configura tu proyecto en Railway

1. Crea una cuenta en [Railway](https://railway.app/) si aún no la tienes.
2. Haz clic en "New Project" y selecciona "Deploy from GitHub repo".
3. Selecciona tu repositorio de GitHub.
4. Railway iniciará automáticamente el despliegue. Espera a que termine.

### Paso 3: Agrega una base de datos MongoDB

1. Dentro del panel de tu proyecto en Railway, haz clic en "New" y selecciona "Database".
2. Selecciona "MongoDB".
3. Espera a que se cree la base de datos.

### Paso 4: Configura las variables de entorno

1. En tu proyecto de Railway, selecciona la pestaña "Variables".
2. Agrega las siguientes variables de entorno:
   - `MONGODB_URI`: Railway te proporcionará automáticamente esta variable después de crear la base de datos.
   - `BASE_URL`: Establece la URL de tu aplicación desplegada (será proporcionada por Railway).

### Paso 5: Verifica el despliegue

1. Una vez que el despliegue se haya completado, Railway te proporcionará una URL.
2. Visita esa URL para verificar que tu aplicación se ha desplegado correctamente.

## Estructura del proyecto

```
/
├── src/
│   ├── app/               # Páginas y rutas de la aplicación 
│   ├── components/        # Componentes reutilizables
│   ├── data/              # Datos de ejemplo
│   ├── lib/               # Utilidades y conexión a la base de datos
│   └── models/            # Modelos de MongoDB
├── public/                # Archivos estáticos
└── ...                    # Archivos de configuración
```

## Recursos adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de MongoDB](https://docs.mongodb.com/)
- [Guía de Railway](https://docs.railway.app/)
