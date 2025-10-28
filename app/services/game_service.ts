import HTTPNotFoundException from '#exceptions/http_exceptions/HTTP_not_found_exception'
import HTTPUnauthorized from '#exceptions/http_exceptions/HTTP_unauthorized_exceptions'
import Game from '#models/game'
import db from '@adonisjs/lucid/services/db'

export class GameService {
  async create(id: number, payload: Partial<Game>) {
    payload.userId = id
    const game = await Game.create(payload)
    return game
  }

  async index(userId: number, page: number, limit: number) {
    const games = await db.from('games').where('user_id', userId).paginate(page, limit)
    if (!games || games.length === 0) throw new HTTPNotFoundException('Game not found')

    if (games.hasMorePages) {
      games.getNextPageUrl
      games.getPreviousPageUrl
    }
    return games
  }

  async show(userId: number, gameId: number) {
    const game = await Game.findBy('id', gameId)
    if (!game) throw new HTTPNotFoundException('Game not found')
    if (game?.userId !== userId) throw new HTTPUnauthorized('Unauthorized access')
    await game.load('user')
    return game
  }

  async update(userId: number, gameId: number, payload: Partial<Game>) {
    const game = await Game.findBy('id', gameId)
    if (!game) throw new HTTPNotFoundException('Game not found')
    if (game?.userId !== userId) throw new HTTPUnauthorized('Unauthorized access')

    game.merge(payload)
    await game.save()
    return game
  }

  async delete(userId: number, gameId: number) {
    const game = await Game.findBy('id', gameId)
    if (!game) throw new HTTPNotFoundException('Game not found')
    if (game?.userId !== userId) throw new HTTPUnauthorized('Unauthorized access')

    await game.delete()
    return game
  }
}
