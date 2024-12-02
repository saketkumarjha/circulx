'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, CreditCard, Package, XCircle, RotateCcw, Search, ChevronRight, MessageSquare, Phone, Ticket, Truck, Zap, Store, Globe, ChevronDown, ChevronUp } from 'lucide-react'

interface ActionCardProps {
  icon: React.ReactNode
  title: string
  href: string
}

interface SidebarItem {
  icon: React.ReactNode
  label: string
  href: string
}

interface FAQItem {
  category: string
  question: string
  answer?: string
}

export default function HelpCenter() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const actionCards: ActionCardProps[] = [
    { icon: <ShoppingBag className="w-8 h-8" />, title: "Place an Order", href: "/place-order" },
    { icon: <CreditCard className="w-8 h-8" />, title: "Pay for Your Order", href: "/pay-order" },
    { icon: <Package className="w-8 h-8" />, title: "Track Your Order", href: "/track-order" },
    { icon: <XCircle className="w-8 h-8" />, title: "Cancel an Order", href: "/cancel-order" },
    { icon: <RotateCcw className="w-8 h-8" />, title: "Create a Return", href: "/create-return" },
  ]

  const sidebarItems: SidebarItem[] = [
    { icon: <CreditCard className="w-5 h-5" />, label: "Payments", href: "/payments" },
    { icon: <Ticket className="w-5 h-5" />, label: "Vouchers", href: "/vouchers" },
    { icon: <Truck className="w-5 h-5" />, label: "Delivery", href: "/delivery" },
    { icon: <RotateCcw className="w-5 h-5" />, label: "Returns & Refunds", href: "/returns" },
    { icon: <Package className="w-5 h-5" />, label: "Products", href: "/products" },
    { icon: <Zap className="w-5 h-5" />, label: "Jumia Express", href: "/express" },
    { icon: <Store className="w-5 h-5" />, label: "Sell on Jumia", href: "/sell" },
    { icon: <Globe className="w-5 h-5" />, label: "Jumia Global", href: "/global" },
  ]

  const faqs: FAQItem[] = [
    { category: "Payments", question: "What payment methods are accepted on Jumia?" },
    { category: "Payments", question: "How secure is my payment information on Jumia?" },
    { category: "Payments", question: "What do I do if my payment is declined?" },
    { category: "Returns & Refunds", question: "How long does it take to process a return on Jumia?" },
    { category: "Returns & Refunds", question: "How will I receive my refund after returning an item on Jumia?" },
    { category: "Returns & Refunds", question: "I received an error message that my item cannot be returned, why is that?" },
    { category: "Returns & Refunds", question: "Why was my return request declined and the item sent back to me?" },
    { category: "Returns & Refunds", question: "Does my product have a warranty?" },
    { category: "Returns & Refunds", question: "Is it possible to exchange an item instead of requesting a return and refund?" },
    { category: "Returns & Refunds", question: "I received a refund confirmation, but the amount received is incorrect. What should I do?" },
    { category: "Returns & Refunds", question: "Will I get my delivery fees refunded when returning an item?" },
    { category: "Returns & Refunds", question: "How do I track my return status?" },
    { category: "Returns & Refunds", question: "Do I have to pay for delivery fees when I return a product?" },
  ]

  return (
    <div className="min-h-screen bg-[#FFE4C4]">
      <div className="p-8">
        <h1 className="text-2xl font-semibold mb-2">Help Center</h1>
        <h2 className="text-xl mb-6">Hi, how can we help you?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {actionCards.map((card, index) => (
            <Link
              key={index}
              href={card.href}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center gap-3"
            >
              <div className="text-orange-500">
                {card.icon}
              </div>
              <span className="font-medium">{card.title}</span>
            </Link>
          ))}
        </div>
        
        <div className="relative mt-6 mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder='Type keywords like "return"'
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex gap-8">
            <div className="w-64 border-r pr-6">
              {sidebarItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 py-3 px-4 hover:bg-gray-50 rounded-md group"
                >
                  <span className="text-gray-600 group-hover:text-orange-500">
                    {item.icon}
                  </span>
                  <span className="flex-1">{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
              ))}
            </div>
            <div className="flex-1">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b last:border-b-0">
                    <button
                      onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                      className="w-full flex items-center justify-between py-4 text-left hover:text-orange-500"
                    >
                      <div>
                        <div className="text-sm text-gray-500 mb-1">{faq.category}</div>
                        <div className="font-medium">{faq.question}</div>
                      </div>
                      {expandedIndex === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    {expandedIndex === index && (
                      <div className="pb-4 text-gray-600">
                        {faq.answer || "This is a placeholder answer for the FAQ question."}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 border-t pt-8">
            <h3 className="text-lg font-medium mb-6">Talk to an agent</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-6 border rounded-lg">
                <MessageSquare className="w-6 h-6 text-orange-500" />
                <div>
                  <div className="font-medium mb-2">Live Chat</div>
                  <p className="text-sm text-gray-600">
                    We are available from Monday to Sunday, between 8am and 7pm.
                    Public Holidays between 9am and 5pm.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 border rounded-lg">
                <Phone className="w-6 h-6 text-orange-500" />
                <div>
                  <div className="font-medium mb-2">Call</div>
                  <p className="text-sm text-gray-600">
                    We are available from Monday to Friday, between 8 am and 5 pm.
                    Public Holidays 9 am and 5 pm
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

