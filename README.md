# Tienda Next.js con MongoDB

Aplicación de tienda en línea desarrollada con Next.js 15 y MongoDB. Esta aplicación permite gestionar productos con operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

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

2. Instala las dependencias
```bash
npm install
```

3. Crea un archivo `.env.local` con las siguientes variables:
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

## Tecnologías utilizadas

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: API Routes de Next.js
- **Base de datos**: MongoDB
- **Despliegue**: Railway

## Recursos adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de MongoDB](https://docs.mongodb.com/)
- [Guía de Railway](https://docs.railway.app/)
