import mongoose, { type Connection } from "mongoose"
import type { IBusinessDetails } from "@/models/profile/business"
import type { IContactDetails } from "@/models/profile/contact"
import type { ICategoryBrand } from "@/models/profile/category"
import type { IAddress } from "@/models/profile/address"
import type { IBank } from "@/models/profile/bank"
import type { IDocument } from "@/models/profile/document"
import type { IProfileProgress } from "@/models/profile/progress"

const PROFILE_DB = process.env.PROFILE_DB!

// Cache the database connection
let cachedConnection: Connection | null = null
let connectionPromise: Promise<Connection> | null = null

export async function connectProfileDB(): Promise<Connection> {
  // If we already have a connection, return it
  if (cachedConnection) {
    console.log("Using existing profile database connection")
    return cachedConnection
  }

  // If we're already connecting, return the promise
  if (connectionPromise) {
    console.log("Reusing profile database connection promise")
    return connectionPromise
  }

  console.log("Creating new profile database connection")

  // Create a new connection promise
  connectionPromise = mongoose
    .createConnection(PROFILE_DB, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    })
    .asPromise()
    .then((conn) => {
      console.log("Profile database connected successfully")
      cachedConnection = conn
      return conn
    })
    .catch((error) => {
      console.error("Profile database connection error:", error)
      connectionPromise = null
      throw error
    })

  return connectionPromise
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

// Function to register models
function registerModels(mongoose: any) {
  // Only register models if they don't already exist
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
}

