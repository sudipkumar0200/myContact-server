import z from "zod"

export const validInput = z.object({
    name : z.string().toLowerCase().optional(),
    email : z.string().email(),
    password  : z.string().min(6)
})

export const validContact = z.object({
    firstName : z.string(),
    lastName : z.string(), 
    email : z.string().email(),
    phone : z.string().optional(),
    address : z.string().optional(),
    company : z.string().max(50).optional(),
    jobTitle : z.string().max(50).optional(),
    notes : z.string().optional()
})
export const upValidContact = z.object({
    firstName : z.string().optional(),
    lastName : z.string().optional(), 
    email : z.string().email().optional(),
    phone : z.string().optional(),
    address : z.string().optional(),
    company : z.string().max(50).optional(),
    jobTitle : z.string().max(50).optional(),
    notes : z.string().optional()
})