Following course: https://www.udemy.com/the-complete-nodejs-developer-course-2/learn/v4/content

## take aways
- notes-node
  - debugging Node
    - via command line
      - command: `node inspect <filename>`
      - in degugger:
        - c: continues
        - n: next line
        - list(x): list x lines
      - can also add breakpoint in code.
        - do this by putting `debugger;` for the breakline
    - via chrome
      - command: `node --inspect-brk <filename>`
      - goto: `chrome://inspect`
- weather-app
  - pretty print JSON: use `JSON.stringify` with property for spacing set
    - example: `console.log(JSON.stringify(obj, null, 2));`
  - encode strings: `encodeURIComponent(string)`
- node-web-server
  - nodemon can watch any file extension
    - example: `nodemon server.js -e js,hbs`
  - hbs: the handlebars wrapper within Express
  - register middleware: `app.use(<middleware>)`
- node-tests
  - test runner: Mocha
  - assertions: mjackson/expect
  - continuously run tests with: `nodemon --exec 'npm test'`
    - this can be mapped to a custom node script
  - to run custom npm script: `npm run <script_name>`
  - async tests: pass `done` to the mocha function, then call `done` when you're done with assertions
- express-tests
  - can use `supertest` to test express endpoints
  - use spies (from expect) to test external functionality
    - this can be wired up by using an npm module: rewire
      - be careful setting variables, as most imports are const
      - instead, get these variables then update the method you wish to make into
      a spy
