import axios from 'axios'
import qs from 'qs'

const cmEndpoint = 'https://createsend.com//t/getsecuresubscribelink'

/**
 * Requests a secure-subscribe endpoint url from Campaign Monitor
 * that data fields can be uploaded to.  Does save any information to
 * the Campaign Monitor Server
 * @param  {String} id
 *           The Campaign Monitor List's signup <form> ID.
 *           Each subscriber list will have it's own ID.
 *           It can be found on form element in the subscribers copy/paste form
 * @param  {String} email
 *           The email address associated with the data fields being submitted.
 * @param  {String} [endpoint='https://createsend.com//t/getsecuresubscribelink']
 *           The Campaign Monitor Endpoint to make the request to.
 *           Defaults to the built in Campaign monitor get-subscribe url
 * @return {Promise}
 *           An HTTP response that contains the secure-subscribe endpoint
 *           as the data field
 */
function requestSecureSubscribe(id, email, endpoint = cmEndpoint) {
  const config = {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  }
  const data = qs.stringify({
    data: id,
    email
  })

  return axios.post(endpoint, data, config)
}

/**
 * Asynchronously post field data to Campaign Monitor
 * using a secure-subscribe URL endpoint.
 * @param  {String} secureSubscribeUrl
 *           A Campaign Monitor Secure Subscribe url that accepts field sendData
 *           One can be acquired using the requestSecureSubscribe function
 * @param  {Object} [fields={}]
 *           An object of key value pairs, where keys are the form field names
 *           provided by the subscribers copy/paste form, and the values
 *           are the values that the field should be set to.
 * @return {Promise}
 *           An HTTP response that returns a success or failure.
 *           HTML may be returned as the data.  If it is,
 *           it may include a mixed success, or failure, despite a 200 code
 */
function sendData(secureSubscribeUrl, fields = {}) {
  const config = {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  }
  const data = qs.stringify(fields)

  return axios.post(secureSubscribeUrl, data, config)
}

/**
 * Subscribe an email with related field data to Campaign Monitor
 * @param  {String} id
 *           The Campaign Monitor List's signup <form> ID.
 *           Each subscriber list will have it's own ID.
 *           It can be found on form element in the subscribers copy/paste form
 * @param  {String} emailId
 *           The key of the email field in the fields object
 * @param  {Object} fields
 *           An object of key value pairs, where keys are the form field names
 *           provided by the subscribers copy/paste form, and the values
 *           are the values that the field should be set to.
 * @param  {String} [endpoint='https://createsend.com//t/getsecuresubscribelink']
 *           The Campaign Monitor Endpoint to make the request to.
 *           Defaults to the built in Campaign monitor get-subscribe url
 * @return {Promise}
 *           An HTTP response that returns a success or failure.
 *           HTML may be returned as the data.  If it is,
 *           it may include a mixed success, or failure, despite a 200 code
 */
function subscribe(id, emailId, fields, endpoint = cmEndpoint) {
  return requestToken(id, fields[emailId], endpoint).then(response => {
    if (response.status !== 200) {
      return Promise.reject(
        new Error(`Response ${response.status}: Token endpoint request failed`)
      )
    }
    return sendData(response.data, fields)
  })
}

export {
  requestSecureSubscribe,
  sendData,
  subscribe
}
