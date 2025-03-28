export interface CartItem {
    id: string;
    title: string;
    quantity: number;
    price: number;
    image: string;
  }
  
  export interface OrderSummary {
    subtotal: number;
    shipping: number;
    discount: number;
    tax: number;
    total: number;
  }
  
  export interface BillingInformation {
    firstName: string;
    lastName: string;
    company?: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
    email: string;
    phone: string;
    shippingDifferent: boolean;
  }
  
  export interface ShippingInformation {
    firstName: string;
    lastName: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
  }
  
  export interface PaymentInformation {
    method: 'cash' | 'upi' | 'paypal' | 'amazon' | 'card';
    cardDetails?: {
      name: string;
      number: string;
      expiry: string;
      cvc: string;
    };
  }
  
  export interface AdditionalOrderInfo {
    selectWarehouse: boolean;
    selectLogistics: boolean;
    notes?: string;
  }
  
  export interface CheckoutData {
    billing: BillingInformation;
    shipping?: ShippingInformation;
    payment: PaymentInformation;
    additionalInfo: AdditionalOrderInfo;
    items: CartItem[];
    summary: OrderSummary;
    termsAccepted: boolean;
    emailSignup: boolean;
  }