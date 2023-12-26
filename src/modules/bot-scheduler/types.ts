import type BotEntity from './data-access/entity.js'
import type { Repository } from 'typeorm'

export type BotRepository = Repository<BotEntity>
