import { getCurrentUser } from "@/actions/auth"

// Function to fetch seller email from the client side
export async function fetchSellerEmail(): Promise<string | null> {
  try {
    const response = await fetch("/api/seller/profile/email")
    if (!response.ok) {
      throw new Error("Failed to fetch seller email")
    }

    const data = await response.json()
    return data.email || null
  } catch (error) {
    console.error("Error fetching seller email:", error)
    return null
  }
}

// Server-side function to get seller email
export async function getSellerEmailFromServer() {
  try {
    const user = await getCurrentUser()

    if (!user?.id) {
      console.log("No user ID found in session")
      return null
    }

    // This would be implemented in your API route
    // Just defining the interface here
    return { userId: user.id }
  } catch (error) {
    console.error("Error getting seller email from server:", error)
    return null
  }
}

