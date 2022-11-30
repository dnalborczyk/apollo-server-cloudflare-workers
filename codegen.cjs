'use strict'

module.exports = {
  generates: {
    './src/types/schema.generated.ts': {
      config: {
        immutableTypes: true,
        useIndexSignature: true,
        useTypeImports: true,
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
  hooks: {
    afterOneFileWrite: ['prettier --write'],
  },
  schema: './src/schema/typeDefs.ts',
}
