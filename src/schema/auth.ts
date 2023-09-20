import * as z from "zod"

const schema =  z.object({
    email: z.string().email(),
    password: z.string().min(3, 'minmium password length is 3').max(256, 'maximium password length is 256')
})
type Auth = z.infer<typeof schema>;
export { schema };
export type { Auth };
