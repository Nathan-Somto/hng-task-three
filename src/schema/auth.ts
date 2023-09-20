import * as z from "zod"

const schema =  z.object({
    email: z.string().email(),
    password: z.string().min(3).max(256)
})
type Auth = z.infer<typeof schema>;
export { schema };
export type { Auth };
