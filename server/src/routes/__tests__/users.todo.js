//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=users%20integration&em=
*/
import axios from 'axios'
import {generate} from 'til-server-test-utils'
import startServer from '../../start'

let server

jest.unmock('axios')

const port = 8788
const api = axios.create({
  baseURL: `http://localhost:${port}/api`,
})

beforeAll(async () => {
  server = await startServer({port})
})

afterAll(() => server.close())

test('user CRUD', async () => {
  const loginForm = generate.loginForm()
  const createdUser = await api
    .post('auth/register', loginForm)
    .then(r => r.data.user)
  console.log(createdUser.data)
  const result = await api.get('users')
  console.log(result.data)
})
