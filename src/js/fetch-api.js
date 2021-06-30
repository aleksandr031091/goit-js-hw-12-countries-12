const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountry(countries) {
  return fetch(`${BASE_URL}/name/${countries}`).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('not found');
  });
}

export default { fetchCountry };
