import {isPasswordAllowed, userToJSON} from '../auth'

describe('isPasswordAllowed', () => {
  const allowedPasswords = ['sfkl.e903f.s']
  const disallowedPasswords = ['', 'ffffffffff', '88888888888888']

  // Generated passwords
  allowedPasswords.forEach(pwd => {
    it(`"${pwd}" should be allowed`, () => {
      expect(isPasswordAllowed(pwd)).toBe(true)
    })
  })

  disallowedPasswords.forEach(pwd => {
    it(`"${pwd}" should not be allowed`, () => {
      expect(isPasswordAllowed(pwd)).toBe(false)
    })
  })
})

test('isPasswordAllowed only allows some passwords', () => {
  // here's where I'll demo things for you :)

  // to test if your tests are running
  // expect.assertions(4)
  // if (true) return
  // OR
  // try negating the assertions or break the code and run the test
  expect(isPasswordAllowed('')).toBe(false)
  expect(isPasswordAllowed('ffffffffff')).toBe(false)
  expect(isPasswordAllowed('88888888888888')).toBe(false)
  expect(isPasswordAllowed('sfkl.e903f.s')).toBe(true)
})

test('userToJSON excludes secure properties', () => {
  // Here you'll need to create a test user object
  // pass that to the userToJSON function
  // and then assert that the test user object
  // doesn't have any of the properties it's not
  // supposed to.
  // Here's an example of a user object:
  // const user = {
  //   id: 'some-id',
  //   username: 'sarah',
  //   // ↑ above are properties which should
  //   // be present in the returned object
  //
  const safeUser = {
    id: 1,
    username: 'abe',
  }
  const user = {
    ...safeUser,
    exp: new Date(),
    iat: new Date(),
    hash: 'some really long string',
    salt: 'some reaafsdfslly long string',
  }
  //   // ↓ below are properties which shouldn't
  //   // be present in the returned object
  //   exp: new Date(),
  //   iat: new Date(),
  //   hash: 'some really long string',
  //   hash: 'some really long string',
  // }

  expect(userToJSON(user)).not.toEqual(user)
  expect(userToJSON(user)).toEqual(safeUser)
  expect(userToJSON({})).toEqual({})
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=auth%20util&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
