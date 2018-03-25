following: https://itnext.io/hooking-up-firebase-to-your-redux-store-a5e799cf84c4

## getting started

### firebase config

* create file: firebase.config.js
* get config code snippet from firebase.google.com, specific to the project you want to use
  * make sure the project has read/write set to true for anyone
* add line at end of file: `export default firebase.database();`
