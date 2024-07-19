// import React from 'react'
import { z } from 'zod'

export const UserFormValidation = z.object({
    name: z.string()
        .min(2, "Name must be at least 2 characters.")
        .max(50, "Name must be at most 50 characters"),
        // .nonempty("Name is required."),

    email: z.string().email("Invalid email address."),
    // .nonempty("Email is required"),
    
    phone: z.string().refine((phone) =>  /^\+234[0-9]{10}$/.test(phone), "Invalid phone number"
      ),

})
