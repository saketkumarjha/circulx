// Server-side Razorpay types
declare module "razorpay" {
  export default class Razorpay {
    constructor(config: { key_id: string; key_secret: string });

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

// Client-side Razorpay types
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color: string;
  };
}

declare class RazorpayClient {
  constructor(options: RazorpayOptions);
  open(): void;
}