export interface BusinessDetails {
    legalEntityName: string
    tradeName: string
    gstin: string
    country: string
    pincode: string
    state: string
    city: string
    businessEntityType: string
  }
  
  export interface ContactDetails {
    contactName: string
    phoneNumber: string
    emailId: string
    pickupTime: string
  }
  
  export type TabType = "business" | "contact" | "category" | "addresses" | "bank" | "documents"
  
  