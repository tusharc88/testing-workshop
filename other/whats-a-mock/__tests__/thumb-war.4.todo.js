// avoid monkey-patching with jest.mock
import thumbWar from '../thumb-war'
import * as utils from '../utils'

// add an inline mock with the jest.mock API
//
jest.mock('../utils', () => {
  // mocking the entier '../utils' module
  const actualUtils = require.requireActual('../utils')
  return {
    ...actualUtils,
    getWinner: jest.fn((p1, p2) => p2),
  }
})
//
// (Hint #1)

test('returns winner', () => {
  // remove the next two lines
  // jest.spyOn(utils, 'getWinner')
  // utils.getWinner.mockImplementation((p1, p2) => p2)

  // clears all mock object's data
  utils.getWinner.mockClear()
  const winner = thumbWar('Ken Wheeler', 'Kent C. Dodds')
  expect(winner).toBe('Kent C. Dodds')
  expect(utils.getWinner).toHaveBeenCalledTimes(2)
  utils.getWinner.mock.calls.forEach(args => {
    expect(args).toEqual(['Ken Wheeler', 'Kent C. Dodds'])
  })

  // remove the next line
  // utils.getWinner.mockRestore()
})

/*
Hint below:














































jest.mock('../utils', () => {
  return {
    // ...
    // see answer in the solution file
  }
})

 */
