import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  features: string[];
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  features: { type: [String], required: true },
}, {
  timestamps: true
});

// Verificamos si el modelo ya existe para evitar errores
export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema); 