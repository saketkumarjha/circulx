"use client"

import { useState, useEffect, useCallback } from "react"
import { BusinessForm } from "@/components/seller/profiles/business-form"
import { ContactForm } from "@/components/seller/profiles/contact-form"
import { CategoryBrandForm } from "@/components/seller/profiles/category-brand-form"
import { AddressForm } from "@/components/seller/profiles/address-form"
import { BankForm } from "@/components/seller/profiles/bank-form"
import { DocumentForm } from "@/components/seller/profiles/document-form"
import { ProfileSuccess } from "@/components/seller/profiles/profile-success"
import { getProfileData } from "@/actions/profile"
import type { TabType } from "@/types/profile"
import { Loader2, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const TAB_ORDER: TabType[] = ["business", "contact", "category", "addresses", "bank", "documents"]

// Properly type the tabs array to ensure value is recognized as TabType
const tabs: { label: string; value: TabType }[] = [
  { label: "Business", value: "business" },
  { label: "Contact", value: "contact" },
  { label: "Category", value: "category" },
  { label: "Address", value: "addresses" },
  { label: "Bank", value: "bank" },
  { label: "Documents", value: "documents" },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("business")
  const [completedSteps, setCompletedSteps] = useState<TabType[]>([])
  const [loading, setLoading] = useState(true)
  const [profileData, setProfileData] = useState<any>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  // Use useCallback to prevent recreation of this function on every render
  const fetchProfileData = useCallback(async () => {
    try {
      setLoading(true)
      const result = await getProfileData()
      if (result.success) {
        setProfileData(result.data)

        // Check if result.data.progress exists before accessing its properties
        if (result.data.progress) {
          setCompletedSteps(result.data.progress.completedSteps || [])
          setActiveTab(result.data.progress.currentStep || "business")

          // Show success screen if all steps are completed
          if (result.data.progress.completedSteps?.includes("documents")) {
            setShowSuccess(true)
          }
        }
      }
    } catch (error) {
      console.error("Error fetching profile data:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Only fetch data on initial mount
  useEffect(() => {
    fetchProfileData()
  }, [fetchProfileData])

  // Memoize this function to prevent recreation on every render
  const isTabEnabled = useCallback(
    (tab: TabType) => {
      const currentIndex = TAB_ORDER.indexOf(activeTab)
      const tabIndex = TAB_ORDER.indexOf(tab)
      return tabIndex <= currentIndex || completedSteps.includes(tab)
    },
    [activeTab, completedSteps],
  )

  // Memoize renderForm to prevent unnecessary re-renders
  const renderForm = useCallback(() => {
    if (!profileData) return null

    switch (activeTab) {
      case "business":
        return <BusinessForm initialData={profileData.business} />
      case "contact":
        return <ContactForm initialData={profileData.contact} />
      case "category":
        return <CategoryBrandForm initialData={profileData.category} />
      case "addresses":
        return <AddressForm initialData={profileData.address} />
      case "bank":
        return <BankForm initialData={profileData.bank} />
      case "documents":
        return <DocumentForm initialData={profileData.document} onSuccess={() => setShowSuccess(true)} />
      default:
        return null
    }
  }, [activeTab, profileData])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
      </div>
    )
  }

  if (showSuccess) {
    return <ProfileSuccess />
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Profile Management</h1>
        <p className="text-muted-foreground">Update your business and personal information here.</p>
      </div>

      <div className="mb-8">
        <nav className="flex space-x-2 md:space-x-4 border-b overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => isTabEnabled(tab.value) && setActiveTab(tab.value)}
              disabled={!isTabEnabled(tab.value)}
              className={cn(
                "px-3 py-2 text-xs md:text-sm font-medium transition-colors whitespace-nowrap",
                "border-b-2 -mb-px flex items-center gap-1",
                activeTab === tab.value ? "border-orange-600 text-orange-600" : "border-transparent",
                isTabEnabled(tab.value)
                  ? "hover:text-orange-600 text-muted-foreground"
                  : "opacity-50 cursor-not-allowed text-muted-foreground",
                completedSteps.includes(tab.value) ? "text-green-600" : "",
              )}
            >
              {completedSteps.includes(tab.value) && <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-600" />}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mx-auto max-w-2xl">{renderForm()}</div>
    </div>
  )
}

