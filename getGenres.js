const request = require('superagent');
const login = require('./login');

const {
    host
  , recommendations
  , genres
} = require('./constants');

const getGenres = async () => (
  request
    .get(host + recommendations + genres)
    .set('Authorization', `Bearer ${await login()}`)
    .then(res => res.body.genres.forEach(g => console.log(g)))
    .catch(err => console.log(err))
);

getGenres();