import { model, Schema, Document } from 'mongoose';
import { Product } from '@interfaces/products.interface';

const productSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    stockVisible: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

productSchema.index({ userId: 1, category: 1 });
productSchema.index({ userId: 1, stock: 1 });

const productModel = model<Product & Document>('Product', productSchema);

export default productModel;
