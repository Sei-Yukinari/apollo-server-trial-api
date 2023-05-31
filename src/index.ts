import { setupServer } from '@/infrastructure/server'
import { startStandaloneServer } from '@apollo/server/standalone'

async function main() {
  const server = await setupServer()
  server.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`)
  })
}

main()


