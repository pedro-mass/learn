import { pairRoles } from '.'

describe('pairRoles()', () => {
  it('can pair roles to users when its 1:1', () => {
    const roles = createEnum(['standup', 'retro', 'showcase', 'metrics'])
    const users = [
      {
        name: 'pedro',
      },
      {
        name: 'chris',
      },
      {
        name: 'jeff',
      },
      {
        name: 'jay',
      },
    ]

    const pairs = pairRoles(roles, users)
    expect(pairs).toHaveLength(Object.keys(roles).length)
    expect(getUsers(pairs)).toHaveLength(users.length)
    expect(getUnique(getUsers(pairs))).toHaveLength(users.length)
  })

  it('handle not receiving any users', () => {
    const roles = createEnum(['one'])
    const users = []
    const pairs = pairRoles(roles, users)

    expect(pairs).toHaveLength(Object.keys(roles).length)
    expect(getUsers(pairs)).toHaveLength(0)
  })

  it('should label unused users as "backup"', () => {
    const users = ['pedro', 'chris', 'jeff'].map(name => ({ name }))
    const roles = createEnum(['the-man'])
    const pairs = pairRoles(roles, users)

    expect(pairs).toHaveLength(Object.keys(roles).length + 1)
    expect(pairs.find(pair => pair.role === 'backups').user).toHaveLength(
      users.length - Object.keys(roles).length
    )
  })
})

function getUsers (pairs) {
  return pairs
    .map(pair => pair.user)
    .filter(Boolean)
    .map(user => user.name)
}

function getUnique (entries) {
  return [...new Set(entries)]
}

// function logPairs (pairs) {
//   console.log(pairs.map(pair => ({ ...pair, user: JSON.stringify(pair.user) })))
// }

function createEnum (strings) {
  return strings.reduce((map, string) => ({ ...map, [string]: string }), {})
}
