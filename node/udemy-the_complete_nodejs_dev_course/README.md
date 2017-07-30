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
