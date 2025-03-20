import mongoose from "mongoose"
import type { IBusinessDetails } from "@/models/profile/business"
import type { IContactDetails } from "@/models/profile/contact"
import type { ICategoryBrand } from "@/models/profile/category"
import type { IAddress } from "@/models/profile/address"
import type { IBank } from "@/models/profile/bank"
import type { IDocument } from "@/models/profile/document"
import type { IProfileProgress } from "@/models/profile/progress"

const PROFILE_DB_URI = process.env.PROFILE_DB || process.env.PROFILE_DB || ""

if (!PROFILE_DB_URI) {
  throw new Error("Please define the PROFILE_DB  environment variable")
}

let cached = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

// Define schemas
const BusinessSchema = new mongoose.Schema<IBusinessDetails>(
  {
    userId: { type: String, required: true, index: true },
    legalEntityName: { type: String, required: true },
    tradeName: { type: String, required: true },
    gstin: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    businessEntityType: { type: String, required: true },
  },
  { timestamps: true },
)

const ContactSchema = new mongoose.Schema<IContactDetails>(
  {
    userId: { type: String, required: true, index: true },
    contactName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    emailId: { type: String, required: true },
    pickupTime: { type: String, required: true },
  },
  { timestamps: true },
)

const CategoryBrandSchema = new mongoose.Schema<ICategoryBrand>(
  {
    userId: { type: String, required: true, index: true },
    categories: [{ type: String, required: true }],
    authorizedBrands: [{ type: String, required: true }],
  },
  { timestamps: true },
)

const AddressSchema = new mongoose.Schema<IAddress>(
  {
    userId: { type: String, required: true, index: true },
    billingAddress: {
      country: { type: String, required: true },
      state: { type: String, required: true },
      city: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      phoneNumber: { type: String, required: true },
    },
    pickupAddress: {
      country: { type: String, required: true },
      state: { type: String, required: true },
      city: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      phoneNumber: { type: String, required: true },
    },
  },
  { timestamps: true },
)

const BankSchema = new mongoose.Schema<IBank>(
  {
    userId: { type: String, required: true, index: true },
    accountHolderName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    ifscCode: { type: String, required: true },
    bankName: { type: String, required: true },
    branch: { type: String, required: true },
    city: { type: String, required: true },
    accountType: { type: String, required: true },
    bankLetterUrl: { type: String, required: true },
  },
  { timestamps: true },
)

const DocumentSchema = new mongoose.Schema<IDocument>(
  {
    userId: { type: String, required: true, index: true },
    panCardUrl: { type: String, required: true },
    gstinUrl: { type: String, required: true },
    bankLetterUrl: { type: String, required: true },
    bankStatementUrl: { type: String, required: true },
    corporationCertificateUrl: { type: String, required: true },
    businessAddressUrl: { type: String, required: true },
    pickupAddressProofUrl: { type: String, required: true },
    signatureUrl: { type: String, required: true },
    balanceSheet2223Url: { type: String, required: true },
    balanceSheet2324Url: { type: String, required: true },
  },
  { timestamps: true },
)

const ProfileProgressSchema = new mongoose.Schema<IProfileProgress>(
  {
    userId: { type: String, required: true, index: true },
    completedSteps: [{ type: String, required: true }],
    currentStep: { type: String, required: true },
  },
  { timestamps: true },
)

export async function connectProfileDB() {
  if (cached.conn) {
    console.log("Using existing profile MongoDB connection")
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    console.log("Connecting to profile MongoDB...")
    cached.promise = mongoose.connect(PROFILE_DB_URI, opts).then((mongoose) => {
      // Register models
      if (!mongoose.models.Business) {
        mongoose.model("Business", BusinessSchema)
      }
      if (!mongoose.models.Contact) {
        mongoose.model("Contact", ContactSchema)
      }
      if (!mongoose.models.CategoryBrand) {
        mongoose.model("CategoryBrand", CategoryBrandSchema)
      }
      if (!mongoose.models.Address) {
        mongoose.model("Address", AddressSchema)
      }
      if (!mongoose.models.Bank) {
        mongoose.model("Bank", BankSchema)
      }
      if (!mongoose.models.Document) {
        mongoose.model("Document", DocumentSchema)
      }
      if (!mongoose.models.ProfileProgress) {
        mongoose.model("ProfileProgress", ProfileProgressSchema)
      }

      console.log("Profile MongoDB connected successfully")
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    console.error("Error connecting to profile MongoDB:", e)
    throw e
  }

  return cached.conn
}

