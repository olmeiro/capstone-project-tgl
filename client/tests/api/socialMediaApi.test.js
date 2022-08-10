import socialMediaApi from '../../src/api/socialMediaApi'

describe('tests on socialMediaApi', () => {
  test('should have config by default', () => {
    expect(socialMediaApi.defaults.baseURL).toBe(process.env.VITE_URL_API)
  })

  test('should have x-token header in all requests', async () => {
    const token = 'ABC-123-XYZ'
    localStorage.setItem('token', token)
    const res = await socialMediaApi.get('/user/all')

    expect(res.config.headers['x-token']).toBe(token)
  })
})
