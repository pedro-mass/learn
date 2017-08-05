Following course: https://www.udemy.com/the-complete-nodejs-developer-course-2/learn/v4/content

## take aways
- uses the native mongodb client, instead of mongoose
  - only for the first half as an introduction, but then uses mongoose to actually build up the API
- id fields are objects that contain the time stamp
  - example: `_.id.getTimestamp() -> 2017-08-01T12:53:23.000Z`
- can query by ID, but needs to be an object for the query
  - example: `.find({ _id: new ObjectID('598077a472e6d979da9bbf9b') })`
- HTTP statuses: https://httpstatuses.com/
- heroku setup:
  - get port from process.env
  - specify node version in package.json
  - create app: `heroku create`
  - to add mongolab: `heroku addons:create mongolab:sandbox`
    - adds MONGODB_URI to process.env - use this for the mongodb connection
- Postman
  - can save a collection of requests
  - can create environment variables. This allows easy switching of URL between local and heroku
    - example: `{{url}}/todos`
