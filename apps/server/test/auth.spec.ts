import request from 'supertest'

import {app} from '../src/app'

describe('POST /login', () => {
  it.only('It should has status code 200', async function () {
    expect.assertions(2)
    const response = await request(app).post('/login').send({username: 'Adnan'})
    expect(response.status).toEqual(200)
    expect(response.headers['set-cookie']).toHaveLength(1)
  })

  it.only('It returns an error if wrong data is sent', async function () {
    expect.assertions(2)
    const response = await request(app)
      .post('/login')
      .send({notUsername: 'Adnan'})
    expect(response.status).toEqual(400)
    expect(response.headers['set-cookie']).toBeFalsy()
  })
})

describe('POST /logout', () => {
  it.only('It should has status code 401 if you try to logout before you login', async function () {
    expect.assertions(1)
    const response = await request(app).post('/logout')
    expect(response.status).toEqual(401)
  })

  it.only('It should has status code 200', async function () {
    expect.assertions(2)
    const response = await request(app).post('/login').send({username: 'Adnan'})
    expect(response.status).toEqual(200)

    const cookie = response.get('Set-Cookie')

    const response2 = await request(app)
      .post('/logout')
      .set('Cookie', cookie)
      .send()
    expect(response2.status).toEqual(200)
  })
})

describe('POST /check-auth', () => {
  it.only('It should has status code 401 before login', async function () {
    expect.assertions(1)
    const response = await request(app).post('/check-auth').send()
    expect(response.status).toEqual(401)
  })

  it.only('It should has status code 200 after login', async function () {
    expect.assertions(2)
    const response = await request(app).post('/login').send({username: 'Adnan'})
    expect(response.status).toEqual(200)

    const cookie = response.get('Set-Cookie')

    const response2 = await request(app)
      .post('/check-auth')
      .set('Cookie', cookie)
      .send()
    expect(response2.status).toEqual(200)
  })
})
