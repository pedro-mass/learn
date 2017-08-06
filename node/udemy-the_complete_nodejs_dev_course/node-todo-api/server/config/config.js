const _ = require('lodash');

let env = process.env.NODE_ENV || 'dev';

if (env == 'dev' || env == 'test') {
  const config = require('./config.json');
  _.assign(process.env, config[env]);
}

// switch (env) {
//   case 'dev':
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
//     break;
//   case 'test':
//     process.env.PORT = 3001;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
//     process.env.NUMBER_OF_ROUNDS = 10;
//     break;
// }
