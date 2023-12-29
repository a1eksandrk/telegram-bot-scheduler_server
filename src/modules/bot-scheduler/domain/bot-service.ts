import type { BotDto } from './bot-dto.js'

type TgResponse<Entity extends Record<string, unknown>> = {
  ok: boolean
  error_code?: number
  description?: string
  result?: Entity
}

type BotResponse = Pick<BotDto, 'id'>

const TG_API_URL = 'https://api.telegram.org'

class BotService {
  private get tgApiUrl (): string {
    return `${TG_API_URL}/bot${this.token}`
  }

  constructor (private readonly token: string) {}

  public async getMe (): Promise<BotDto | null> {
    const method = 'getMe'
    const url = this.buildUrl(method)

    const response = await fetch(url, { method: 'GET' })
    const tgResponce = await response.json() as TgResponse<BotResponse>

    if (!tgResponce.ok || !tgResponce.result) return null

    const { id } = tgResponce.result

    return { id, token: this.token }
  }

  private buildUrl (method: string): string {
    return `${this.tgApiUrl}/${method}`
  }
}

export default BotService
