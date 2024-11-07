import payload from 'payload'
import { parseStringify } from './utils'

interface signUpParams {
  email: string
  password: string
  firstName: string
  lastName: string
}

export const createUser = async ({ email, password, firstName, lastName }: signUpParams) => {
  try {
    const userData = {
      email,
      password,
      firstName,
      lastName,
      roles: ['author'],
    }

    const response = await fetch('/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.message || 'Error sign up user')
    }
    return result
  } catch (error) {
    console.log('error signing up user', error)
  }
}
