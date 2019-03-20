import CryptoJS from 'crypto-js';
import moment from 'moment';

const marvelURL = 'https://gateway.marvel.com/v1/public/',
  apiKey = `apikey=${process.env.REACT_APP_PUBLIC_API_KEY}`,
  timeStamp = moment().unix(),
  hash = CryptoJS.MD5(
    timeStamp +
      process.env.REACT_APP_PRIVATE_API_KEY +
      process.env.REACT_APP_PUBLIC_API_KEY
  );

const getMarvelCharacters = options => {
  const { offset, sortName, limit } = Object.assign(
    {
      offset: 0,
      sortName: '',
      limit: 20
    },
    options
  );

  let url = `${marvelURL}characters?${apiKey}&ts=${timeStamp}&hash=${hash}&offset=${offset}&orderBy=${sortName}name&limit=${limit}`;

  return fetch(url)
    .then(res => res.json())
    .then(resObj => {
      try {
        if (resObj.code === 200) {
          if (offset > resObj.data.total) {
            throw new Error('Page does not exist.');
          } else {
            const pages = Math.floor(resObj.data.total / limit);
            return {
              characters: resObj.data.results,
              maxPage: resObj.data.total % limit > 0 ? pages + 1 : pages
            };
          }
        } else {
          throw new Error(
            `Marvel API bad response. Status code ${resObj.code}.`
          );
        }
      } catch (e) {
        console.error(e);
        return {
          characters: [],
          maxPage: 0
        };
      }
    });
};

const getComicsByCharacter = (characterId, offset = 0) => {
  const URI = `characters/${characterId}/comics`;
  const params = `?${apiKey}&ts=${timeStamp}&hash=${hash}&limit=20&offset=${offset}`;
  const url = `${marvelURL}${URI}${params}`;

  return fetch(url)
    .then(res => res.json())
    .then(resObj => {
      try {
        if (resObj.code === 200) {
          return {
            comics: resObj.data.results
          };
        } else {
          throw new Error(
            `Marvel API bad response. Status code ${resObj.code}.`
          );
        }
      } catch (e) {
        console.error(e);
        return {
          comics: []
        };
      }
    });
};

export { getMarvelCharacters, getComicsByCharacter };
