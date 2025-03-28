import { connectDB2 } from '@/lib/db';
import mongoose from 'mongoose';

interface Order {
  order_id: string;
  order_date: string;
  buyer_id: number;
  seller_id: number;
  status: string;
  amount: number;
  billingDetails: object;
  paymentMethod: string;
  created_at?: string;
  updated_at?: string;
}

const orderSchema = new mongoose.Schema<Order>({
  order_id: { type: String, required: true },
  order_date: { type: String, required: true },
  buyer_id: { type: Number, required: true },
  seller_id: { type: Number, required: true },
  status: { type: String, required: true },
  amount: { type: Number, required: true },
  billingDetails: { type: Object, required: true },
  paymentMethod: { type: String, required: true },
  created_at: { type: String },
  updated_at: { type: String }
});

const db = await connectDB2();
const OrderModel = db.models.Order || db.model<Order>('Order', orderSchema);

export { OrderModel, orderSchema };