import { expect } from 'chai'
import sinon from 'sinon'
import qs from 'qs'
import signupAjax from 'signup-ajax'

console.log(signupAjax);

require('../test-helper.js')

describe('signup-ajax', () => {
  const fakeAxios = {
    get: sinon.spy(),
    post: sinon.spy()
  }

  describe('requestSecureSubscribe', () => {
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
      await signupAjax.requestSecureSubscribe(id, email, endpoint)
    })

    after(() => {
      fakeAxios.post.resetHistory()
      // signupAjax.__ResetDependency__('axios')
    })

    it('called post with the correct arguments', () => {
      expect(fakeAxios.post).to.have.been.calledWith(...expected)
    })
  })

  describe('sendData', () => {
    const secureUrl = 'https://testendpoint.com/not/real/secure/signup/xyz'
    const fields = {
      'key-123-ok': 'myEmail@emails.com',
      'ano-ther-456': 'R4ND0M-US3R1D',
      'nam-eke-y78': 'John Ipsum'
    }

    const config = {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    }

    const data = qs.stringify(fields)

    const expected = [
      secureUrl,
      data,
      config
    ]

    before(async () => {
      signupAjax.__Rewire__('axios', fakeAxios)
      await signupAjax.sendData(secureUrl, fields)
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
