import HTTPAlreadyExistsException from '#exceptions/http_exceptions/HTTP_already_exists_exception'
import HTTPBadRequestException from '#exceptions/http_exceptions/HTTP_bad_request_exception'
import HTTPNotFoundException from '#exceptions/http_exceptions/HTTP_not_found_exception'
import User from '#models/user'

export class UserService {
  async register(payload: Partial<User>) {
    const hasUser = await User.findBy('email', payload.email)

    if (hasUser) throw new HTTPAlreadyExistsException('User already exists')

    const user = await User.create(payload)

    return user
  }

  async login(payload: Partial<User>) {
    console.log(payload)
    if (!payload.email || !payload.password)
      throw new HTTPBadRequestException('Invalid users credentials')
    const user = await User.verifyCredentials(payload.email, payload.password)

    const token = await User.accessTokens.create(user)

    return token
  }

  async show(id: number) {
    const user = await User.findBy('id', id)
    if (!user) throw new HTTPNotFoundException('User not found')
    return user
  }

  async delete(id: number) {
    const user = await User.findBy('id', id)
    if (!user) throw new HTTPNotFoundException('User not found')

    await user.delete()
    return user
  }
}
