import vine from '@vinejs/vine'

const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim(),
    email: vine.string().email().trim(),
    password: vine.string(),
  })
)

const loginUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim(),
    password: vine.string(),
  })
)

export { createUserValidator, loginUserValidator }
