let env = process.env.NODE_ENV || 'dev';

switch (env) {
  case 'dev':
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
    break;
  case 'test':
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
    break;
}
