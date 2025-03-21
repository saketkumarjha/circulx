import { NextResponse } from "next/server"
import { connectProfileDB } from "@/lib/profileDb"
import mongoose from "mongoose"

// Define interfaces for our data
interface Business {
  userId: string
  legalEntityName?: string
  tradeName?: string
  createdAt?: string | Date
  [key: string]: any // For other properties
}

interface Contact {
  userId: string
  emailId?: string
  phoneNumber?: string
  [key: string]: any // For other properties
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const userId = params.id

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    console.log(`Fetching seller ${userId} from profile database`)
    const db = await connectProfileDB()

    // Get the Business model
    const BusinessSchema = new mongoose.Schema({}, { strict: false })
    const Business = db.models.Business || db.model("Business", BusinessSchema)

    // Get the Contact model
    const ContactSchema = new mongoose.Schema({}, { strict: false })
    const Contact = db.models.Contact || db.model("Contact", ContactSchema)

    // Fetch the business
    const business = (await Business.findOne({ userId }).lean()) as Business | null

    if (!business) {
      return NextResponse.json({ error: "Seller not found" }, { status: 404 })
    }

    // Fetch the contact
    const contact = (await Contact.findOne({ userId }).lean()) as Contact | null

    // Combine business and contact data
    const seller = {
      id: business.userId || "",
      name: business.legalEntityName || "",
      tradeName: business.tradeName || "",
      email: contact?.emailId || "",
      phone: contact?.phoneNumber || "",
      registeredDate: business.createdAt ? new Date(business.createdAt).toLocaleDateString() : "",
    }

    return NextResponse.json(seller)
  } catch (error) {
    console.error("Error fetching seller details:", error)
    return NextResponse.json({ error: "Failed to fetch seller details" }, { status: 500 })
  }
}

