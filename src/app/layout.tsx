import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { getCurrentUser } from "../actions/auth"
import Providers from "./providers"

// Load the Inter font with proper subsets
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Optimize font loading
})

export const metadata = {
  title: "Circulx - Your one-stop shop",
  description: "Your one-stop shop for all your needs",
  viewport: "width=device-width, initial-scale=1",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get the current user for the header
  let user = null
  try {
    user = await getCurrentUser()
  } catch (error) {
    console.error("Error getting current user:", error)
    // Continue without user data
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header user={user} />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

