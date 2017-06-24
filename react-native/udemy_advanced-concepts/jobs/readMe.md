# Setup:
- create `secret.js` file with the following object exported:
```javascript
  let secret = {};

  // developers.facebook.com -> app's dashboard
  secret.facebook = {
    appId: '',
    appSecret: ''
  };

  // https://ads.indeed.com/jobroll/xmlfeed
  secret.indeed = {
    publisherId: ''
  }

  export default secret;
```
