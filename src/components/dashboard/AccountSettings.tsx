"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Country, State } from "country-state-city"
import { User } from "lucide-react"

export default function AccountSettings() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    secondaryEmail: "",
    phoneNumber: "",
    country: "",
    state: "",
    zipCode: "",
  })
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [countries, setCountries] = useState<any[]>([])
  const [states, setStates] = useState<any[]>([])
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    setCountries(Country.getAllCountries())
  }, [])

  const validateEmail = useCallback((email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(email)
  }, [])

  const validateForm = useCallback(() => {
    const requiredFields = ["fullName", "email", "phoneNumber", "country", "state", "zipCode"]
    const isValid =
      requiredFields.every((field) => formData[field as keyof typeof formData] !== "") && validateEmail(formData.email)
    setIsFormValid(isValid)
  }, [formData, validateEmail])

  useEffect(() => {
    validateForm()
  }, [validateForm])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCountryChange = (value: string) => {
    const selectedCountry = countries.find((country) => country.isoCode === value)
    setFormData((prev) => ({ ...prev, country: value, state: "" }))
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry.isoCode))
    } else {
      setStates([])
    }
  }

  const handleStateChange = (value: string) => {
    setFormData((prev) => ({ ...prev, state: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isFormValid) {
      console.log(formData)
      // Handle form submission
    }
  }

  return (
    <Card className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-start">
        {/* Profile Image Section */}
        <div className="text-center">
          <div className="relative w-40 h-40 mx-auto mb-4">
            {profileImage ? (
              <Image
                src={profileImage || "/placeholder.svg"}
                alt="Profile"
                fill
                className="rounded-full object-cover border-4 border-emerald-900"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center border-4 border-emerald-900">
                <User className="w-20 h-20 text-gray-400" />
              </div>
            )}
          </div>
          <input type="file" id="profileImage" accept="image/*" className="hidden" onChange={handleImageUpload} />
          <Button
            variant="outline"
            className="w-full hover:bg-orange-500 hover:text-white"
            onClick={() => document.getElementById("profileImage")?.click()}
          >
            Change Photo
          </Button>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">
                Full Name <span className="text-orange-500">*</span>
              </Label>
              <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-orange-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondaryEmail">Secondary Email</Label>
              <Input
                id="secondaryEmail"
                name="secondaryEmail"
                type="email"
                value={formData.secondaryEmail}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">
                Phone Number <span className="text-orange-500">*</span>
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">
                Country/Region <span className="text-orange-500">*</span>
              </Label>
              <Select value={formData.country} onValueChange={handleCountryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">
                State <span className="text-orange-500">*</span>
              </Label>
              <Select value={formData.state} onValueChange={handleStateChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">
                Zip Code <span className="text-orange-500">*</span>
              </Label>
              <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleInputChange} required />
            </div>
          </div>

          <Button type="submit" className="bg-emerald-900 hover:bg-orange-500 text-white" disabled={!isFormValid}>
            Save Changes
          </Button>
        </form>
      </div>
    </Card>
  )
}

