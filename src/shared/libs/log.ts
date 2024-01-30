import { pino } from 'pino'

import type { Logger, QueryRunner } from 'typeorm'

export const logger = pino()

export class PinoTypeOrmLogger implements Logger {
  logQuery (query: string, parameters?: any[], _queryRunner?: QueryRunner): any {
    logger.debug(
      { query, parameters },
      'sql query'
    )
  }

  logQueryError (
    error: string,
    query: string,
    parameters?: any[],
    _queryRunner?: QueryRunner
  ): any {
    logger.error(
      { query, parameters, error },
      'failed sql query'
    )
  }

  logQuerySlow (
    time: number,
    query: string,
    parameters?: any[],
    _queryRunner?: QueryRunner
  ): any {
    logger.warn(
      { query, parameters, time },
      'slow sql query'
    )
  }

  logSchemaBuild (message: string, _queryRunner?: QueryRunner): any {
    logger.debug(message)
  }

  logMigration (message: string, _queryRunner?: QueryRunner): any {
    logger.debug(message)
  }

  log (
    level: 'log' | 'info' | 'warn',
    message: any,
    _queryRunner?: QueryRunner
  ): any {
    switch (level) {
      case 'log':
      case 'info':
        logger.info(message)
        break
      case 'warn':
        logger.warn(message)
        break
    }
  }
}
