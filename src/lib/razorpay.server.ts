import Razorpay from 'razorpay';

// Server-side instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Extend type definitions for server-side
declare module 'razorpay' {
  interface Razorpay {
    orders: {
      create(params: {
        amount: number;
        currency: string;
        receipt?: string;
        payment_capture?: number;
      }): Promise<{
        id: string;
        amount: number;
        currency: string;
        status: string;
        created_at: number;
      }>;
    };
  }
}

export default razorpay;