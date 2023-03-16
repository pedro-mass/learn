// import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
// import type { AppRouter } from '../../server/src/index'

// export const trpc = createTRPCProxyClient<AppRouter>({
//   links: [
//     httpBatchLink({
//       url: 'http://localhost:4000/trpc',
//     }),
//   ],
// })

import { createTRPCReact, httpBatchLink } from '@trpc/react-query'
import type { AppRouter } from '../../server/src/index'

export const trpc = createTRPCReact<AppRouter>()

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000/trpc',
    }),
  ],
})
