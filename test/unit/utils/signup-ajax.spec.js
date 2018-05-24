import { expect } from 'chai'
import sinon from 'sinon'
import qs from 'qs'
import signupAjax from 'signup-ajax'

require('../test-helper.js')

describe('signup-ajax', () => {
  const fakeAxios = {
    get: sinon.spy(),
    post: sinon.spy()
  }

  describe('requestToken', () => {
    const id = "RANDOLONGALPHANUMERICSTRING1234567"
    const email = 'testemail@internet.com'
    const endpoint = 'https://testendpoint.com//t/not-real'
    const config = {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    }

    const data = qs.stringify({
      data: id,
      email
    })

    const expected = [
      endpoint,
      data,
      config
    ]

    before(async () => {
      signupAjax.__Rewire__('axios', fakeAxios)
      await squidexApi.requestToken(id, email, endpoint)
    })

    after(() => {
      fakeAxios.post.resetHistory()
      // signupAjax.__ResetDependency__('axios')
    })

    it('called post with the correct arguments', () => {
      expect(fakeAxios.post).to.have.been.calledWith(...expected)
    })
  })
})
