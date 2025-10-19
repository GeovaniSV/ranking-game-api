/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const userController = () => import('#controllers/users_controller')
const gameController = () => import('#controllers/game_controller')

router
  .group(() => {
    router.post('/register', [userController, 'register'])
    router.post('/login', [userController, 'login'])
  })
  .prefix('/auth')

router
  .group(() => {
    router.get('/', [userController, 'show'])
    router.delete('/', [userController, 'destroy'])
  })
  .prefix('users')
  .use(middleware.auth({ guards: ['api'] }))

router
  .group(() => {
    router.post('/', [gameController, 'store'])
    router.get('/', [gameController, 'index'])
    router.get('/:id', [gameController, 'show'])
    router.put('/:id', [gameController, 'update'])
    router.delete('/:id', [gameController, 'destroy'])
  })
  .prefix('games')
  .use(middleware.auth({ guards: ['api'] }))
