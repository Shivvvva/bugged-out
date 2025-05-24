import { useState } from 'react'
import { AuthForm } from './AuthForm'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6, { message: 'Too short homie' })
})

const signupSchema = z.object({
  username: z.string().min(2, { message: 'Enter a valid name' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6, { message: 'Nahh, get that weak sh*t outta here' })
})

const Auth = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login')

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'signup' : 'login'))
  }

  const isLogin = mode === 'login'

  return (
    <div className='flex flex-col w-full h-screen justify-center'>

      {isLogin ? (
        <AuthForm
          key={mode}
          schema={loginSchema}
          defaultValues={{ email: '', password: '' }}
          onSubmit={async (values) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log('Logging in:', values)
          }}
          buttonLabel='Login'
        />
      ) : (
        <AuthForm
          key={mode}
          schema={signupSchema}
          defaultValues={{ username: '', email: '', password: '' }}
          onSubmit={async (values) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log('Signing up:', values)
          }}
          buttonLabel='Sign Up'
        />
      )}

      <div className='text-center mt-4'>
        <button onClick={toggleMode} className='text-blue-500 hover:underline'>
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
        </button>
      </div>
    </div>
  )
}

export default Auth