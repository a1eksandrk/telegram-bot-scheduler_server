import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
class BotEntity {
  @PrimaryColumn('text')
  id: string

  @Column('text')
  token: string
}

export default BotEntity
