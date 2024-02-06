## tutorial
https://dev.to/agorushkin/url-shortener-api-with-express-in-5-minutes-2ehp?signin=true&utm_source=pocket_mylist

## review
- easy to read, but the second half has poor instructions
- doesn't have clearly defined instructions on how to test that the code works by booting it up and manually testing it
## tweaks:
- [ ] improve data storage logic
  - [ ] switch storage links from array -> object
  - [ ] switch Storage to a class to do the file verification once
- [ ] use redis!
- [ ] better url validator: https://www.npmjs.com/package/validator
- [ ] add middleware to log out requests