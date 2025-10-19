import { UserService } from '#services/user_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

//validator
import { createUserValidator, loginUserValidator } from '#validators/user'
import HTTPUnauthorized from '#exceptions/http_exceptions/HTTP_unauthorized_exceptions'

@inject()
export default class UsersController {
  constructor(protected usersServices: UserService) {}

  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    const user = await this.usersServices.register(payload)
    return response.created(user)
  }

  async login({ request, response }: HttpContext) {
    const payload = await request.validateUsing(loginUserValidator)
    const token = await this.usersServices.login(payload)
    return response.ok(token)
  }

  async show({ auth, response }: HttpContext) {
    const authUser = auth.user
    if (!authUser) throw new HTTPUnauthorized('Unauthorized access')
    const user = await this.usersServices.show(authUser.id)

    return response.ok(user)
  }

  async destroy({ auth, response }: HttpContext) {
    const authUser = auth.user
    if (!authUser) throw new HTTPUnauthorized('Unauthorized access')
    const user = await this.usersServices.delete(authUser.id)
    return response.ok({ message: 'Deleted user', user })
  }
}
