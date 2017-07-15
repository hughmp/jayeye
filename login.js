const request = require('superagent');

const { clientId, clientSecret } = require('./secrets.js');

const {
    authorisationHost
  , authToken
} = require('./constants');

let token = null;

module.exports = login = () => {
  if (!!token) return token;
  console.log('logging in....');
  return request
    .post(authorisationHost + authToken)
    .set('Authorization', `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`)
    .send('grant_type=client_credentials')
    .then(res => token = res.body.access_token)
    .catch(err => console.log(err))
};