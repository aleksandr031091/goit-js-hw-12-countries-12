import API from './fetch-api';
import refs from './refs';

import countryTpl from '../templates/country.hbs';
import countriesTpl from '../templates/countries.hbs';

import debounce from 'lodash.debounce';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core/dist/PNotify.js';

refs.input.addEventListener('input', debounce(onSearchCountry, 500));

function onSearchCountry(e) {
  if (e.target.value === '') {
    return;
  }

  API.fetchCountry(e.target.value)
    .then(res => renderCountry(res))
    .catch(err => error({ text: err.message }));
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
    error({ text: 'Too many matches found. Please enter a more specific query!' });
  }
}
