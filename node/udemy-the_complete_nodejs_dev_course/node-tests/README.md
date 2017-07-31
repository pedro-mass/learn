Following course: https://www.udemy.com/the-complete-nodejs-developer-course-2/learn/v4/content

## take aways
- test runner: Mocha
- assertions: mjackson/expect
- continuously run tests with: `nodemon --exec 'npm test'`
  - this can be mapped to a custom node script
- to run custom npm script: `npm run <script_name>`
- async tests: pass `done` to the mocha function, then call `done` when you're done with assertions
