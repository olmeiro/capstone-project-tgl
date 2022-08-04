import socialMediaApi from '../../src/api/socialMediaApi'

describe('tests on socialMediaApi', () => {
  test('should have config by default', () => {
    // console.log(socialMediaApi)
    // console.log(process.env)
    expect(socialMediaApi.defaults.baseURL).toBe(process.env.VITE_URL_API)
  })

  test('should have x-token header in all requests', async () => {
    const token = 'ABC-123-XYZ'
    localStorage.setItem('token', token)
    const res = await socialMediaApi.get('/user/all')

    // console.log(res.config.headers['x-token'])
    expect(res.config.headers['x-token']).toBe(token)
  })
})
