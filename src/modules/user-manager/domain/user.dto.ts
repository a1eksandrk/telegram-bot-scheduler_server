import type UserEntity from '#shared/entities/user.entity.js'

class UserDTO {
  private readonly _userId: string
  private readonly _username: string
  private readonly _email: string

  public get userId (): string { return this._userId }
  public get username (): string { return this._username }
  public get email (): string { return this._email }

  constructor (userEntity: UserEntity) {
    this._userId = userEntity.userId
    this._username = userEntity.username
    this._email = userEntity.email
  }
}

export default UserDTO
