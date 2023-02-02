import request from 'supertest'
import {app} from '../src/app'

let cookie: string[]

describe('POST /create-room', () => {
  it.only('It should has status code 401 if you are not logged in', async function () {
    expect.assertions(1)
    const response = await request(app).post('/create-room').send({
      name: 'my room',
      password: '123',
      numOfPlayers: 2,
      watchable: false,
    })
    expect(response.status).toEqual(401)
  })
})

describe('POST /create-room', () => {
  beforeAll(async function () {
    const response = await request(app).post('/login').send({username: 'Adnan'})
    cookie = response.get('Set-Cookie')
  })

  it.only('It should has status code 200 if you are logged in and send the right data', async function () {
    expect.assertions(1)
    const response = await request(app)
      .post('/create-room')
      .set('Cookie', cookie)
      .send({
        name: 'my room',
        password: '123',
        numOfPlayers: 2,
        watchable: false,
      })
    expect(response.status).toEqual(200)
  })

  it.only('It should has status code 400 if you are logged in and send the wrong data', async function () {
    expect.assertions(1)
    const response = await request(app)
      .post('/create-room')
      .set('Cookie', cookie)
      .send({
        name: 'my room',
        password: '123',
        watchable: false,
      })
    expect(response.status).toEqual(400)
  })
})

// describe('POST /join-room', () => {
//   it.only('It should has status code 400 if ', async function () {
//     expect.assertions(1)
//     const response = await request(app)
//     // expect(response.status).toEqual(400)
//   })
// })

// describe('POST /leave-room', () => {
//   it.only('It should has status code 400 if ', async function () {
//     expect.assertions(1)
//     const response = await request(app)
//     // expect(response.status).toEqual(400)
//   })
// })
