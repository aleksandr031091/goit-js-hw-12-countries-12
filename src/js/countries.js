import debounce from 'lodash.debounce';

import countryTpl from '../templates/country.hbs';
import countriesTpl from '../templates/countries.hbs';

const refs = {
  input: document.querySelector('#input-countries-js'),
  countryBox: document.querySelector('#countries-box'),
};

function fetchCountry(countries) {
  const url = `https://restcountries.eu/rest/v2/name/${countries}`;

  return fetch(url).then(res => {
    return res.json();
  });
}

refs.input.addEventListener('input', debounce(onSearchCountry, 500));

function onSearchCountry(e) {
  fetchCountry(e.target.value)
    .then(res => renderCountry(res))
    .catch(error => console.log(error));
}

function renderCountry(countries) {
  if (countries.length > 1) {
    // refs.countryBox.innerHTML = '';
    const markupCountries = countriesTpl(countries);
    refs.countryBox.innerHTML = markupCountries;
  }
  const markup = countryTpl(countries);
  refs.countryBox.innerHTML = markup;
}
