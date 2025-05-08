import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { products as initialProducts } from '@/data/products';

// Función para inicializar la base de datos con productos de muestra
export async function seedDatabase() {
  try {
    await connectDB();
    
    // Verificar si ya hay productos en la base de datos
    const count = await Product.countDocuments();
    
    if (count === 0) {
      console.log('Inicializando base de datos con productos de muestra...');
      
      // Eliminar el id antes de insertar para que MongoDB genere sus propios IDs
      const productsToInsert = initialProducts.map(product => {
        const { id, ...rest } = product;
        return rest;
      });
      
      await Product.insertMany(productsToInsert);
      console.log(`${productsToInsert.length} productos insertados correctamente.`);
    } else {
      console.log(`La base de datos ya contiene ${count} productos. No se inicializarán productos de muestra.`);
    }
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  }
} 