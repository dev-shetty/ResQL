import { z } from "zod"
import { TYPES_OF_USER } from "./constants.js"

export const rescuerSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  password: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  skills: z.string().array().optional(),
})

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
  type: z.enum(TYPES_OF_USER).default("rescuer"),
})

export const disasterSchema = z.object({
  id: z.string(),
  authority_id: z.string(),
  type: z.string(),
  name: z.string(),
  description: z.string(),
  date: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  people_affected: z.number(),
  severity: z.number(),
})

export const donationSchema = z.object({
  id: z.string(),
  organization_id: z.string(),
  name: z.string(),
  amount: z.number(),
})
