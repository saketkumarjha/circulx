"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { BusinessForm } from "@/components/seller/profiles/business-form"
import { ContactForm } from "@/components/seller/profiles/contact-form"
import type { TabType } from "@/types/profile"

const tabs: { label: string; value: TabType }[] = [
  { label: "Business Details", value: "business" },
  { label: "Contact Details", value: "contact" },
  { label: "Category and Brand", value: "category" },
  { label: "Addresses", value: "addresses" },
  { label: "Bank Details", value: "bank" },
  { label: "Documents", value: "documents" },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("business")

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Profile Management</h1>
        <p className="text-muted-foreground">Update your business and personal information here.</p>
      </div>

      <div className="mb-8">
        <nav className="flex space-x-4 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                "border-b-2 -mb-px",
                activeTab === tab.value ? "border-primary text-primary" : "border-transparent text-muted-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="max-w-2xl">
        {activeTab === "business" && <BusinessForm />}
        {activeTab === "contact" && <ContactForm />}
        {activeTab === "category" && <div>Category and Brand form coming soon...</div>}
        {activeTab === "addresses" && <div>Addresses form coming soon...</div>}
        {activeTab === "bank" && <div>Bank Details form coming soon...</div>}
        {activeTab === "documents" && <div>Documents form coming soon...</div>}
      </div>
    </div>
  )
}

