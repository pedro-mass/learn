const { SHA256 } = require('crypto-js');

const message = 'I am user number 3';
const hash = SHA256(message);

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

let data = {
  id: 4
};

let token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'someSecret').toString()
};

let resultHash = SHA256(JSON.stringify(token.data) + 'someSecret').toString();

if (resultHash === token.hash) {
  console.log('Data was not changed');
} else {
  console.log('Data was changed. Do not trust!');
}
