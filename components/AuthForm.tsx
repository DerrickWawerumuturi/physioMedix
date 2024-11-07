"use client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createUser } from "@/utils/payload.auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"



const formSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(2, "password must be at least 2 characters").max(50),
})


const AuthForm = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true)
            const user = await createUser({
                email: values.email,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
            })

            if (user) {
                router.push("/")
            }
        } catch (err) {
            console.log("error")
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className='flex space-x-7 mb-3'>
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                {/* Increase the size of the label */}
                                <FormLabel className="text-xl font-semibold">First Name</FormLabel>
                                <FormControl>
                                    {/* Increase the size of the input */}
                                    <Input className="text-lg p-4" placeholder="simon" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                {/* Increase the size of the label */}
                                <FormLabel className="text-xl font-semibold">Last Name</FormLabel>
                                <FormControl>
                                    {/* Increase the size of the input */}
                                    <Input className="text-lg p-4" placeholder="muturi" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            {/* Increase the size of the label */}
                            <FormLabel className="text-xl font-semibold">Username</FormLabel>
                            <FormControl>
                                {/* Increase the size of the input */}
                                <Input className="text-lg p-4" placeholder="simon" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xl font-semibold">Password</FormLabel>
                            <FormControl>
                                <Input className="text-lg p-4" placeholder="*****" {...field} type='password' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    disabled={isLoading}
                >
                    {
                        isLoading ?
                            <Loader2 className="animate-spin" />
                            : 'Sign Up'
                    }

                </Button>
            </form>
        </Form>

    )
}

export default AuthForm