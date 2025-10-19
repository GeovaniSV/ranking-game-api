import vine from '@vinejs/vine'

const createGameValidator = vine.compile(
  vine.object({
    name: vine.string().trim().optional(),
    description: vine.string().trim().optional(),
    review: vine.string().maxLength(120).trim(),
    score: vine.number().min(1).max(5),
    filePath: vine.string().trim(),
  })
)

const updateGameValidator = vine.compile(
  vine.object({
    name: vine.string().trim().optional(),
    description: vine.string().trim().optional(),
    review: vine.string().maxLength(120).trim().optional(),
    score: vine.number().min(1).max(5).optional(),
    filePath: vine.string().trim().optional(),
  })
)

export { createGameValidator, updateGameValidator }
