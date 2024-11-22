import zod from 'zod';

 const signupUserSchema = zod.object({
    username: zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string()
});

 const siginUserSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

 const updateUserSchema = zod.object({
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
    password: zod.string().optional()
 })


export {siginUserSchema, signupUserSchema}
