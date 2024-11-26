# intermediate NextJs

## notes

### introduction

- notes: https://clumsy-humor-894.notion.site/0-Intro-d0196d3511c34cd69b8690efb51d84b0
- link to intro course: https://frontendmasters.com/courses/next-js-v3/
- course repo: https://github.com/Hendrixer/intermediate-nextjs
- course notes: https://clumsy-humor-894.notion.site/Intermediate-Next-js-0f91d69bdb5046c3920caf325222eb97
- database choice: https://turso.tech/
  - https://app.turso.tech/pedro-mass/databases/pardy
- ORM: https://frontendmasters.com/blog/introducing-drizzle/

### form auth actions

- notes: 1. react standards: https://clumsy-humor-894.notion.site/1-React-Standards-a0f820253e4c469aaf2b4950947650fd
- react learning path: https://frontendmasters.com/learn/react/
- notes: 2. form actions: https://clumsy-humor-894.notion.site/2-Form-Actions-6bea6558a8de4d06885dab04396ba278
- notes: 2a. implementation: https://clumsy-humor-894.notion.site/2a-Implementation-67360f7c86a340b0a40eba5d94ddd571
- start on step/0: `git checkout step/0`
  - [x] create the auth action
  - [x] create the register form
  - [x] create submit button + added it to sign-up form
  - [x] verify can sign-up
    - http://localhost:3000/signup
    - fill out form
    - should route to dashboard/home
    - look at user in database:
      - `npm run db:studio`
  - sign out
    - clear the cookies + http://localhost:3000/signin
  - [x] server action: registerUser
  - [x] wire up sign-in form w/ submit button
  - [x] sign in incorrectly and see error message
  - [x] sign in correctly, and see dashboard/home

### routing & data fetching

- notes: 3. route slots aka parallel routes: https://clumsy-humor-894.notion.site/3-Route-Slots-901e6035a3a24e94b9ae7173b55fe20f
  - [x] dashboard layout
  - [x] slot: @events
    - just return the string: 'events'
  - [x] slot: @rsvps
    - just return the string: 'rsvps'
  - [x] visit dashboard (after being signed in)
- [ ] default.tsx => used when the router can't find a page to render => useful for slots that don't need to render on nested-routes
  - [x] dashboard/
  - [x] @events
  - [x] @rsvp
- server-side data fetching
  - notes:
    - 4. server side data fetching: https://clumsy-humor-894.notion.site/4-Server-side-data-fetching-3ed60cfb519d437ba293d4d0a6766777
    - 4a. implementation: https://clumsy-humor-894.notion.site/4a-Implementation-17a5b4927699420098c36bdce0ee0234
  - steps:
    - [x] server: getCurrentUser()
      - primarily going to be used for mutations
      - we'll lock down the routes a different way through the layout
- displaying attendee count
  - steps:
  - [x] server: getAttendeesCountForDashboard()
  - [x] call it in dashboard/page.tsx
    - [x] if 0, seed DB with: `nr db:seed`
    - [x] refresh page to see new count
- fetching events & rsvps
  - steps:
    - [x] server: getEvents()
    - [x] page: @events
    - [x] verify
    - [x] server: getRsvps()
    - [x] page: @rsvps
    - [x] verify
- per-request caching
  - notes: https://clumsy-humor-894.notion.site/4a-Implementation-17a5b4927699420098c36bdce0ee0234
  - can use `import { cache } from 'react'`
  - but this does not have fine-grained control
    - validates per request
    - cant' control invalidation
- cache persistence & revalidation tags
  - notes: https://clumsy-humor-894.notion.site/4a-Implementation-17a5b4927699420098c36bdce0ee0234
  - `import { unstable_cache } from 'next/cache`
    - doesn't work like the docs says it should work
    - probably not ready
  - `import { memoize } from 'nextjs-better-unstable-cache'`
    - works better
    - combines react's cache, plus the unstable_cache from next, and makes it more predictable
    - allows you to cache across requests
    - allows you to manually invalidate -> granting you full control
- suspense and errors
  - notes: https://clumsy-humor-894.notion.site/5-Suspense-and-Errors-803721679f594cefb241894f85aa0b9a
  - implementation: https://clumsy-humor-894.notion.site/5a-Implementation-11089b630dd14abfade46d3fa1d887b6?pvs=25
  - `loading.tsx`
    - wraps the render in the `Suspense` component, and uses this file as the fallback
  - `error.tsx`
    - acts as the react-error-boundary
    - must have: `use client`
      - since this file is a catch for runtime errors

### active & protected routes

- active routes
  - notes:
    - https://clumsy-humor-894.notion.site/6-Active-route-c093edcf677d448586be1710edeb5a5f
    - https://clumsy-humor-894.notion.site/6a-Implementation-e68772e85a7f400e9bbec00885c4a4a1?pvs=25
