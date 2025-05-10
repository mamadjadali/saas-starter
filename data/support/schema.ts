// schema.ts
import { z } from "zod"

export const schemaTickets = z.object({
  created: z.string(),
  status: z.string(),
  description: z.string(),
  priority: z.string(),
  category: z.string(),
  type: z.string(),
  duration: z.string().nullable(), // call duration in minutes
  policyNumber: z.string(),
  policyType: z.string(),
})

export type Ticket = z.infer<typeof schemaTickets>

export const statusOptions = ["resolved", "in-progress", "escalated"] as const
export type Status = (typeof statusOptions)[number]

export const categoryTypes = [
  {
    name: "Accident",
    value: "accident-report",
    extended: "Report a new accident or incident",
    description: "File initial accident reports and incidents",
  },
  {
    name: "Emergency",
    value: "emergency",
    extended: "Emergency Assistance Request",
    description: "Immediate help for urgent situations",
  },
  {
    name: "Document Request",
    value: "document-request",
    extended: "Policy Document Service",
    description: "Request insurance documentation",
  },
  {
    name: "Service",
    value: "account-service",
    extended: "Account Management",
    description: "General account-related assistance",
  },
] as const

export const policyTypes = [
  {
    name: "آزاد",
    value: "none",
    extended: "none",
    description: "تعرفه آزاد",
  },
  {
    name: "بیمه درمان تامین اجتماعی",
    value: "tamin",
    extended: "health-related",
    description: "پوشش خدمات پزشکی و سلامت",
  },
  {
    name: "بیمه درمان تکمیلی",
    value: "takmili",
    extended: "health-related",
    description: "پوشش خدمات پزشکی و سلامت",
  },
  {
    name: "بیمه‌ی عمر",
    value: "life",
    extended: "health-related",
    description: "پوشش خدمات پزشکی و سلامت",
  },
  {
    name: "بیمه نیروهای مسلح",
    value: "army",
    extended: "health-related",
    description: "پوشش خدمات پزشکی و سلامت",
  },
  {
    name: " بیمه‌ی درمانی شهرداری",
    value: "shar",
    extended: "health-related",
    description: "پوشش خدمات پزشکی و سلامت",
  },
] as const

// Update the types to match the new structure
export type Category = (typeof categoryTypes)[number]["value"]
export type PolicyType = (typeof policyTypes)[number]["value"]

// Helper function to get category details
export const getCategoryDetails = (value: Category) => {
  return categoryTypes.find((cat) => cat.value === value)
}

// Helper function to get policy type details
export const getPolicyDetails = (value: PolicyType) => {
  return policyTypes.find((policy) => policy.value === value)
}

export const appointmentTypes: {
  name: string
  value: string
  extended: string
}[] = [
  {
    name: "Routine Checkup",
    value: "checkup",
    extended: "Monthly or Annual Chekups",
  },
  {
    name: "New Operation",
    value: "operation",
    extended: "New Operation",
  },
  {
    name: "Emergency",
    value: "emergency",
    extended: "Emergency Assistance",
  },
  {
    name: "Consult",
    value: "consult",
    extended: "Consult Discussion",
  },
]

export const priorities: {
  value: string
  label: string
  sla: string | boolean
  description: string
}[] = [
  {
    value: "emergency",
    label: "Emergency",
    sla: "15m",
    description: "Accidents, injuries, immediate assistance needed",
  },
  {
    value: "canceled",
    label: "Canceled",
    sla: "4h",
    description: "Coverage issues, policy changes",
  },
  {
    value: "pending",
    label: "Pending",
    sla: "24h",
    description: "General inquiries, documentation requests",
  },
  {
    value: "scheduled",
    label: "Scheduled",
    sla: "48h",
    description: "Information requests, future policy changes",
  },
]
