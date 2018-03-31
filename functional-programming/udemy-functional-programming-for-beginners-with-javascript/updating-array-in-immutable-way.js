// 1. create a constant named friends, 
// which is an array that contains 2 
// names of your choosing.
const friends = ['Nate', 'Michael'];

// 2. Create a new constant named updatedFriends, 
// which includes the friends array values plus 
// one additional name
const updatedFriends = [...friends, 'Dustin'];

// 3. Create a new constant named friendNameLengths, 
// which is based on the array updatedFriends, 
// but instead of having the friends names, 
// have the array store the length of each persons name.
const friendNameLengths = updatedFriends.map(friend => friend.length);

// 4. Create a new constant named shorterNamedFriends, 
// which will be a list of the friends except the friend with the longest name.
const longestLength = friendNameLengths.reduce((max, length) => length > max ? length : max, 0)
const shorterNamedFriends = updatedFriends.filter(friend => friend.length >= longestLength);

// 5. Print each variable to the console.
console.log(friends, updatedFriends, friendNameLengths, shorterNamedFriends);

// Solution can be seen at: 
// https://jsbin.com/vutatag/1/edit?js,console