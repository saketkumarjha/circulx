"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BusinessForm } from "@/components/seller/profiles/business-form"
import { ContactForm } from "@/components/seller/profiles/contact-form"
import { CategoryBrandForm } from "@/components/seller/profiles/category-brand-form"
import { AddressForm } from "@/components/seller/profiles/address-form"
import { BankForm } from "@/components/seller/profiles/bank-form"
import { DocumentForm } from "@/components/seller/profiles/document-form"
import { ProfileSuccess } from "@/components/seller/profiles/profile-success"
import { ProgressBar } from "@/components/seller/profiles/progress-bar"
import { getProfileData } from "@/actions/profile"
import type { TabType } from "@/types/profile"
import { Loader2 } from "lucide-react"

const TAB_ORDER: TabType[] = ["business", "contact", "category", "addresses", "bank", "documents"]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("business")
  const [completedSteps, setCompletedSteps] = useState<TabType[]>([])
  const [loading, setLoading] = useState(true)
  const [profileData, setProfileData] = useState<any>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true)
        const result = await getProfileData()
        if (result.success) {
          setProfileData(result.data)
          setCompletedSteps(result.data.progress?.completedSteps || [])
          setActiveTab(result.data.progress?.currentStep || "business")

          // Show success screen if all steps are completed
          if (result.data.progress?.completedSteps?.includes("documents")) {
            setShowSuccess(true)
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [])

  const isTabDisabled = (tab: TabType) => {
    const currentIndex = TAB_ORDER.indexOf(activeTab)
    const tabIndex = TAB_ORDER.indexOf(tab)
    return tabIndex > currentIndex && !completedSteps.includes(tab)
  }

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
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Seller Profile</h1>

      <ProgressBar completedSteps={completedSteps} currentStep={activeTab} totalSteps={TAB_ORDER} />

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
          <TabsTrigger
            value="business"
            disabled={isTabDisabled("business")}
            className={completedSteps.includes("business") ? "border-b-2 border-green-500" : ""}
          >
            Business
            {completedSteps.includes("business") && <span className="ml-1 text-green-500">✓</span>}
          </TabsTrigger>
          <TabsTrigger
            value="contact"
            disabled={isTabDisabled("contact")}
            className={completedSteps.includes("contact") ? "border-b-2 border-green-500" : ""}
          >
            Contact
            {completedSteps.includes("contact") && <span className="ml-1 text-green-500">✓</span>}
          </TabsTrigger>
          <TabsTrigger
            value="category"
            disabled={isTabDisabled("category")}
            className={completedSteps.includes("category") ? "border-b-2 border-green-500" : ""}
          >
            Category
            {completedSteps.includes("category") && <span className="ml-1 text-green-500">✓</span>}
          </TabsTrigger>
          <TabsTrigger
            value="addresses"
            disabled={isTabDisabled("addresses")}
            className={completedSteps.includes("addresses") ? "border-b-2 border-green-500" : ""}
          >
            Address
            {completedSteps.includes("addresses") && <span className="ml-1 text-green-500">✓</span>}
          </TabsTrigger>
          <TabsTrigger
            value="bank"
            disabled={isTabDisabled("bank")}
            className={completedSteps.includes("bank") ? "border-b-2 border-green-500" : ""}
          >
            Bank
            {completedSteps.includes("bank") && <span className="ml-1 text-green-500">✓</span>}
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            disabled={isTabDisabled("documents")}
            className={completedSteps.includes("documents") ? "border-b-2 border-green-500" : ""}
          >
            Documents
            {completedSteps.includes("documents") && <span className="ml-1 text-green-500">✓</span>}
          </TabsTrigger>
        </TabsList>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <TabsContent value="business">
            <BusinessForm initialData={profileData?.business} />
          </TabsContent>
          <TabsContent value="contact">
            <ContactForm initialData={profileData?.contact} />
          </TabsContent>
          <TabsContent value="category">
            <CategoryBrandForm initialData={profileData?.category} />
          </TabsContent>
          <TabsContent value="addresses">
            <AddressForm initialData={profileData?.address} />
          </TabsContent>
          <TabsContent value="bank">
            <BankForm initialData={profileData?.bank} />
          </TabsContent>
          <TabsContent value="documents">
            <DocumentForm initialData={profileData?.document} onSuccess={() => setShowSuccess(true)} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

