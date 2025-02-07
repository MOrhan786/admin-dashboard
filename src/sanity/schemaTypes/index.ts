import { type SchemaTypeDefinition } from 'sanity'

import carSchema from './car'
import userSchema from './user'
import { comment } from './comment'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [carSchema,comment,userSchema],
}
