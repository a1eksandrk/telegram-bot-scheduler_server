import { hash } from '#shared/libs/password.js'
import UserEntity from '#shared/entities/user.entity.js'

import UserDTO from './user.dto.js'
import UserError from './user.error.js'

type UserInfo = {
  username: string
  email: string
  password: string
}

class UserService {
  private readonly userRepository: UserManagerDI['userRepository']

  constructor ({ userRepository }: UserManagerDI) {
    this.userRepository = userRepository
  }

  public async create ({ username, email, password }: UserInfo): Promise<UserDTO | null> {
    const foundByUsername = await this.userRepository.findOneByUsername(username)

    if (foundByUsername) throw new UserError('Пользователь с таким именем уже существует')

    const foundByEmail = await this.userRepository.findOneByEmail(email)

    if (foundByEmail) throw new UserError('Пользователь с такой почтой уже существует')

    const hashedPassword = await hash(password)
    const userEntity = this.createUserEntity(username, email, hashedPassword)
    const createdUser = await this.userRepository.create(userEntity)

    if (!createdUser) return null

    return new UserDTO(createdUser)
  }

  public async delete (userId: string): Promise<UserDTO | null> {
    const deletedUser = await this.userRepository.delete(userId)

    if (!deletedUser) return null

    return new UserDTO(deletedUser)
  }

  private createUserEntity (username: string, email: string, password: string): UserEntity {
    const userEntity = new UserEntity()

    userEntity.username = username
    userEntity.email = email
    userEntity.password = password

    return userEntity
  }
}

export default UserService
