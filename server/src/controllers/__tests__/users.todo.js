//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=users%20test$20object%20factories&em=
*/
import {initDb, generate} from 'til-server-test-utils'
import * as usersController from '../users'
import db from '../../utils/db'

beforeEach(() => initDb())

test.skip('getUsers returns all users in database', async () => {
  // await initDb()
  const req = {}
  const res = {
    json: jest.fn(),
  }
  await usersController.getUsers(req, res)
  expect(res.json).toHaveBeenCalledTimes(1)
  console.log(res.json.mock.calls[0])
})

test.skip('deleteUser will 403 if not requested by the user', async () => {
  const req = {}
  const res = {
    json: jest.fn(),
  }

  const testUser = await db.insertUser(generate.userData())
  req.params = {id: testUser.id}
  req.user = {id: generate.id()}
  await usersController.deleteUser(req, res)

  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.status).toHaveBeenCalledWith(403)
  expect(res.send).toHaveBeenCalledTimes(1)
})

test.skip('deleteUser will 404 if user does not exist', async () => {
  const req = {}
  const res = {
    json: jest.fn(),
  }

  req.params = {id: generate.id()}
  req.user = {id: generate.id()}
  await usersController.deleteUser(req, res)

  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.status).toHaveBeenCalledWith(404)
  expect(res.send).toHaveBeenCalledTimes(1)
})

test.skip('deleteUser will delete the user if properly requested', async () => {
  const req = {}
  const res = {
    json: jest.fn(),
  }

  const testUser = await db.insertUser(generate.userData())
  req.params = {id: testUser.id}
  req.user = {id: testUser.id}
  await usersController.deleteUser(req, res)

  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.status).toHaveBeenCalledWith(204)
  expect(res.send).toHaveBeenCalledTimes(1)

  const userFromDb = await db.getUser(testUser.id)
  expect(userFromDb).toBe(undefined)
})
