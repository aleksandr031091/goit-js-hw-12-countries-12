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
  if (!e.target.value) {
    refs.listCountrys.innerHTML = '';
    return;
  }
  fetchCountry(e.target.value)
    .then(res => renderCountry(res))
    .catch(error => console.log(error));
}

function renderCountry(countries) {
  refs.countryBox.innerHTML = '';
  if (countries.length === 1) {
    const markup = countryTpl(countries);
    refs.countryBox.insertAdjacentHTML('beforeend', markup);
  }
  if (countries.length >= 2 && countries.length <= 10) {
    const markup = countriesTpl(countries);
    refs.countryBox.insertAdjacentHTML('beforeend', markup);
  }
  if (countries.length > 10) {
    console.log('error');
  }
}
