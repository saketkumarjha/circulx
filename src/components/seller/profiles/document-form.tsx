"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Form } from "@/components/ui/form"
import { FileUpload } from "./file-upload"
import type { DocumentDetails } from "@/types/profile"

const MAX_FILE_SIZE = 25 * 1024 * 1024 // 25MB

const documentSchema = z.object({
  panCard: z.instanceof(File).optional(),
  gstin: z.instanceof(File).optional(),
  bankLetter: z.instanceof(File).optional(),
  bankStatement: z.instanceof(File).optional(),
  corporationCertificate: z.instanceof(File).optional(),
  businessAddress: z.instanceof(File).optional(),
  pickupAddressProof: z.instanceof(File).optional(),
  signature: z.instanceof(File).optional(),
  balanceSheet2223: z.instanceof(File).optional(),
  balanceSheet2324: z.instanceof(File).optional(),
})

export function DocumentForm() {
  const form = useForm<DocumentDetails>({
    resolver: zodResolver(documentSchema),
  })

  function onSubmit(data: DocumentDetails) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form id="documents-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FileUpload
            label="ID Proof (PAN Card)"
            onChange={(file) => form.setValue("panCard", file)}
            value={form.getValues("panCard")}
          />
          <FileUpload label="GSTIN" onChange={(file) => form.setValue("gstin", file)} value={form.getValues("gstin")} />
          <FileUpload
            label="Bank Letter/Cancelled Cheque"
            onChange={(file) => form.setValue("bankLetter", file)}
            value={form.getValues("bankLetter")}
          />
          <FileUpload
            label="Bank Statement Copy"
            onChange={(file) => form.setValue("bankStatement", file)}
            value={form.getValues("bankStatement")}
          />
          <FileUpload
            label="Certificate of Corporation"
            onChange={(file) => form.setValue("corporationCertificate", file)}
            value={form.getValues("corporationCertificate")}
          />
          <FileUpload
            label="Business Address"
            onChange={(file) => form.setValue("businessAddress", file)}
            value={form.getValues("businessAddress")}
          />
          <FileUpload
            label="Pickup Address Proof"
            onChange={(file) => form.setValue("pickupAddressProof", file)}
            value={form.getValues("pickupAddressProof")}
          />
          <FileUpload
            label="Signature"
            onChange={(file) => form.setValue("signature", file)}
            value={form.getValues("signature")}
          />
          <FileUpload
            label="FY 2022-23 Balance sheet"
            onChange={(file) => form.setValue("balanceSheet2223", file)}
            value={form.getValues("balanceSheet2223")}
          />
          <FileUpload
            label="FY 2023-24 Balance sheet"
            onChange={(file) => form.setValue("balanceSheet2324", file)}
            value={form.getValues("balanceSheet2324")}
          />
        </div>
      </form>
    </Form>
  )
}

