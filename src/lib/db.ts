import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tiendanext';

// Opciones de conexión con timeout
const options = {
  serverSelectionTimeoutMS: 5000, // Timeout de 5 segundos para la selección de servidor
  connectTimeoutMS: 10000,       // Timeout de 10 segundos para la conexión
};

// Función para conectar a la base de datos
async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      // Ya conectado
      return mongoose.connection;
    }

    // Conectar a la base de datos con opciones de timeout
    const connection = await mongoose.connect(MONGODB_URI, options);
    console.log('MongoDB conectado correctamente');
    return connection;
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error);
    // No lanzamos el error para permitir que la aplicación continúe
    // y use datos locales como fallback
    return null;
  }
}

export default connectDB; 