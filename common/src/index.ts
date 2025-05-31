import z, { TypeOf } from "zod";

const signupInput = z.object({
     email: z.string().email(),
     password:z.string().min(16),
     name: z.string().optional()
})
  
const signinInput = z.object({
     email: z.string().email(),
     password:z.string().min(16)
})
// type interference in zod



export const createBlogInput = z.object({
    title : z.string(),
    content : z.string ()
})



export const updateBlogInput = z.object({
    title : z.string(),
    content : z.string (),
    id : z.number()
})
export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type CreateBlogInput  = z.infer<typeof createBlogInput>
export type UpdateBlogInput  = z.infer<typeof updateBlogInput>