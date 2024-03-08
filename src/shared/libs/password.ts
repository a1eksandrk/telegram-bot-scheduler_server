import bcrypt from 'bcrypt'

const SALT_ROUNDS = 1

export const hash = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS)
  return await bcrypt.hash(password, salt)
}

export const compare = async (input: string, password: string): Promise<boolean> => {
  return await bcrypt.compare(input, password)
}
