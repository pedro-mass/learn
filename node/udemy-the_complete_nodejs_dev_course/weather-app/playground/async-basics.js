console.log('starting app');

setTimeout(() => {
  console.log('Inside of callback');
}, 2000);

setTimeout(() => {
  console.log('No delay');
}, 0);

console.log('finishing up');
