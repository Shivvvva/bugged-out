// this is just a reusable form component. the actual form is in Auth.tsx :p

import { useForm, type DefaultValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z, ZodObject, ZodRawShape } from 'zod'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'

type AuthFormProps<T extends ZodObject<ZodRawShape>> = {
  schema: T
  defaultValues: z.infer<T>
  onSubmit: (values: z.infer<T>) => Promise<void>
  buttonLabel: string,
  showNameField?: boolean
}

export function AuthForm<T extends ZodObject<ZodRawShape>>({
  schema,
  defaultValues,
  onSubmit,
  buttonLabel,
}: AuthFormProps<T>) {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<z.infer<T>>
  });

  const hasNameField = 'username' in schema.shape;

  return (
    <div className='flex flex-col w-90 border rounded-lg p-10 pt-4 self-center'>
      <h2 className='text-center mb-8'>{buttonLabel}</h2>
      <Form {...form}>
        <form className='flex flex-col gap-8 w-full' onSubmit={form.handleSubmit(onSubmit)}>
          {hasNameField && (
            <FormField
              control={form.control}
              name={'username' as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type='username' autoComplete='username' placeholder='Enter your username' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField control={form.control} name={'email' as any} render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input autoComplete='email' placeholder='Enter your email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name={'password' as any} render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Enter your password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <Button type='submit' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Please wait...' : buttonLabel}
          </Button>
        </form>
      </Form>
    </div>
  )
}
