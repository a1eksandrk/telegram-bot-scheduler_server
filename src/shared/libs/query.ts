import type { ObjectLiteral } from 'typeorm'

export const buildWhereParams = <ValueType>(alias: string, key: string, value?: ValueType | null): [string, ObjectLiteral] => {
  const where: string = value ? `${alias}.${key} = :${key}` : ''
  const parameters: ObjectLiteral = { [key]: value }

  return [where, parameters]
}
