Following course: https://www.udemy.com/the-complete-nodejs-developer-course-2/learn/v4/content

## take aways
- can use `supertest` to test express endpoints
- use spies (from expect) to test external functionality
  - this can be wired up by using an npm module: rewire
    - be careful setting variables, as most imports are const
    - instead, get these variables then update the method you wish to make into
    a spy
