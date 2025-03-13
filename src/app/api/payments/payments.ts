import { connectDB2 } from '@/lib/db';
import mongoose from 'mongoose';

interface Payment {
  payment_id: number;
  status: string;
  method: string;
  amount: number;
  created_at?: string;
  updated_at?: string;
}

const paymentSchema = new mongoose.Schema<Payment>({
  payment_id: { type: Number, required: true },
  status: { type: String, required: true },
  method: { type: String, required: true },
  amount: { type: Number, required: true },
  created_at: { type: String },
  updated_at: { type: String }
});

const db = await connectDB2();
const PaymentModel = db.models.Payment || db.model<Payment>('Payment', paymentSchema);

export { PaymentModel, paymentSchema };