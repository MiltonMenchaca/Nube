export interface Product {
  id?: number;
  _id?: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  features: string[];
}

// NOTA: Estos son datos de muestra que se utilizan solo para desarrollo.
// En producción, los productos deben obtenerse desde la API.
export const products: Product[] = [
  {
    id: 1,
    name: "Smartphone Galaxy X20",
    price: 8999.99,
    image: "https://placehold.co/600x400/3498db/ffffff?text=Smartphone",
    description: "El último modelo de smartphone con cámara de alta resolución, batería de larga duración y pantalla AMOLED de 6.5 pulgadas.",
    category: "Electrónicos",
    features: [
      "Pantalla AMOLED 6.5 pulgadas",
      "Cámara 108MP",
      "Batería 5000mAh",
      "Procesador Octa-core",
      "128GB Almacenamiento"
    ]
  },
  {
    id: 2,
    name: "Laptop ProBook Air",
    price: 18499.99,
    image: "https://placehold.co/600x400/2ecc71/ffffff?text=Laptop",
    description: "Laptop ultradelgada con procesador de última generación, perfecta para profesionales y estudiantes que necesitan potencia y portabilidad.",
    category: "Computadoras",
    features: [
      "Procesador Intel i7",
      "16GB RAM",
      "512GB SSD",
      "Pantalla Retina 13.3 pulgadas",
      "Batería 12 horas"
    ]
  },
  {
    id: 3,
    name: "Audífonos SoundMax",
    price: 1299.99,
    image: "https://placehold.co/600x400/9b59b6/ffffff?text=Audífonos",
    description: "Audífonos inalámbricos con cancelación de ruido, sonido de alta fidelidad y hasta 30 horas de batería.",
    category: "Audio",
    features: [
      "Cancelación activa de ruido",
      "Bluetooth 5.0",
      "30 horas de batería",
      "Micrófono integrado",
      "Controles táctiles"
    ]
  },
  {
    id: 4,
    name: "Smartwatch FitPro",
    price: 2499.99,
    image: "https://placehold.co/600x400/e74c3c/ffffff?text=Smartwatch",
    description: "Reloj inteligente con monitor de ritmo cardíaco, GPS integrado y más de 100 modos de entrenamiento para mantener tu salud en óptimas condiciones.",
    category: "Wearables",
    features: [
      "Monitor cardíaco",
      "GPS integrado",
      "Resistente al agua 50m",
      "Batería 7 días",
      "Pantalla AMOLED"
    ]
  },
  {
    id: 5,
    name: "Tablet UltraView",
    price: 5999.99,
    image: "https://placehold.co/600x400/f39c12/ffffff?text=Tablet",
    description: "Tablet con pantalla de alta resolución, perfecta para diseñadores, artistas digitales o para entretenimiento con la mejor calidad de imagen.",
    category: "Tablets",
    features: [
      "Pantalla 10.9 pulgadas",
      "Resolución 2360x1640",
      "Chip A14 Bionic",
      "256GB Almacenamiento",
      "Soporte para lápiz digital"
    ]
  },
  {
    id: 6,
    name: "Cámara DSLR Pro",
    price: 12999.99,
    image: "https://placehold.co/600x400/1abc9c/ffffff?text=Cámara",
    description: "Cámara profesional con sensor de alta resolución, grabación de video 4K y sistema de enfoque automático avanzado para capturar los mejores momentos.",
    category: "Fotografía",
    features: [
      "Sensor 24.2MP",
      "Video 4K 60fps",
      "ISO 100-51200",
      "Enfoque automático 45 puntos",
      "Pantalla táctil abatible"
    ]
  }
];