import type { DataSource } from 'typeorm'

const init = async (db: DataSource, emitter: Emitter): Promise<void> => {}

export default { init }
