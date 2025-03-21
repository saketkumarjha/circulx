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

interface ContactMap {
  [userId: string]: Contact
}

export async function GET() {
  try {
    console.log("Fetching sellers from profile database")
    const db = await connectProfileDB()

    // Get the Business model
    const BusinessSchema = new mongoose.Schema({}, { strict: false })
    const Business = db.models.Business || db.model("Business", BusinessSchema)

    // Get the Contact model
    const ContactSchema = new mongoose.Schema({}, { strict: false })
    const Contact = db.models.Contact || db.model("Contact", ContactSchema)

    // Fetch all businesses
    const businesses = (await Business.find({}).lean()) as unknown as Business[]
    console.log(`Found ${businesses.length} businesses`)

    // Fetch all contacts
    const contacts = (await Contact.find({}).lean()) as unknown as Contact[]
    console.log(`Found ${contacts.length} contacts`)

    // Create a map of contacts by userId for quick lookup
    const contactsByUserId = contacts.reduce((acc: ContactMap, contact: Contact) => {
      if (contact.userId) {
        acc[contact.userId] = contact
      }
      return acc
    }, {})

    // Combine business and contact data
    const sellers = businesses.map((business: Business) => {
      const contact = contactsByUserId[business.userId] || {}

      return {
        id: business.userId || "",
        name: business.legalEntityName || "",
        tradeName: business.tradeName || "",
        email: contact.emailId || "",
        phone: contact.phoneNumber || "",
        registeredDate: business.createdAt ? new Date(business.createdAt).toLocaleDateString() : "",
      }
    })

    return NextResponse.json(sellers)
  } catch (error) {
    console.error("Error fetching sellers:", error)
    return NextResponse.json({ error: "Failed to fetch sellers" }, { status: 500 })
  }
}

