Following course: https://www.udemy.com/the-complete-nodejs-developer-course-2/learn/v4/content

## take aways
- uses the native mongodb client, instead of mongoose
- id fields are objects that contain the time stamp
  - example: `_.id.getTimestamp() -> 2017-08-01T12:53:23.000Z`
- can query by ID, but needs to be an object for the query
  - example: `.find({ _id: new ObjectID('598077a472e6d979da9bbf9b') })`
