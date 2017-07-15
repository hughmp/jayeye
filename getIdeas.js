const request = require('superagent');
const login = require('./login');

const genres = process.argv[2];
const min = process.argv[3];
const max = process.argv[4];

const {
    host
  , recommendations
} = require('./constants');

const getIdeas = async (seed_genres, min_popularity, max_popularity) => (
  console.log(
    await request
      .get(host + recommendations)
      .set('Authorization', `Bearer ${await login()}`)
      .query({ seed_genres, min_popularity, max_popularity })
      .then(res => res.body.tracks.map(t => {
        return {
          trackName: t.name
          , artists: t.artists.map(a => a.name)
          , popularity: t.popularity
          , preview: t.preview_url
        }
      }))
      .catch(err => console.log(err))
  )
);

getIdeas(genres, min, max);