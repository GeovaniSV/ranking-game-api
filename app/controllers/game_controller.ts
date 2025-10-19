import HTTPUnauthorized from '#exceptions/http_exceptions/HTTP_unauthorized_exceptions'
import type { HttpContext } from '@adonisjs/core/http'
import { GameService } from '#services/game_service'
import { inject } from '@adonisjs/core'
import { createGameValidator, updateGameValidator } from '#validators/game'

@inject()
export default class GameController {
  constructor(protected gameService: GameService) {}

  async index({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) throw new HTTPUnauthorized('Unauthorized access')

    const page = request.input('page')
    const limit = request.input('limit')

    const games = await this.gameService.index(user.id, page, limit)

    return response.ok({ data: games })
  }

  async store({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) throw new HTTPUnauthorized('Unauthorized access')

    const payload = await request.validateUsing(createGameValidator)

    const game = await this.gameService.create(user.id, payload)

    return response.created(game)
  }

  async show({ auth, params, response }: HttpContext) {
    const user = auth.user
    if (!user) throw new HTTPUnauthorized('Unauthorized access')

    const game = await this.gameService.show(user.id, params.id)

    return response.ok(game)
  }

  async update({ auth, params, request, response }: HttpContext) {
    const user = auth.user
    if (!user) throw new HTTPUnauthorized('Unauthorized access')

    const payload = await request.validateUsing(updateGameValidator)

    const game = await this.gameService.update(user.id, params.id, payload)

    return response.ok(game)
  }

  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.user
    if (!user) throw new HTTPUnauthorized('Unauthorized access')

    const game = await this.gameService.delete(user.id, params.id)

    return response.ok({ message: 'Game deleted', game })
  }
}
