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
  - [ ] dashboard/
  - [ ] @events
  - [ ] @rsvp
