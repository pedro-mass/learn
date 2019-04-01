import createId from 'uuid/v4'

export function pairRoles (roles, users, roleForBackups = 'backups') {
  const userMap = createUserMap(users)
  const availableUserIds = Object.keys(userMap)
  const getUser = id => userMap[id]

  const pairs = []
  for (const role in roles) {
    const pickedUserIndex = getRandomInt(availableUserIds.length)
    const pickedUserId = availableUserIds[pickedUserIndex]
    removeUser(availableUserIds, pickedUserIndex)

    pairs.push({
      role,
      user: getUser(pickedUserId),
    })
  }

  includeBackups(availableUserIds, pairs, roleForBackups, getUser)

  return pairs
}

function includeBackups (availableUserIds, pairs, roleForBackups, getUser) {
  if (availableUserIds && availableUserIds.length > 0) {
    pairs.push({
      role: roleForBackups,
      user: availableUserIds.map(getUser),
    })
  }
}

function removeUser (users, userIndex) {
  return users.splice(userIndex, 1)
}

function createUserMap (users) {
  return users.reduce((map, user) => ({ ...map, [getUserId(user)]: user }), {})
}

function getUserId (user) {
  return user.id || createId()
}

function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max))
}
