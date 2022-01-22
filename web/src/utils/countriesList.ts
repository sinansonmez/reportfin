import {countries} from "countries-list";

export const continentsArray = ["Africa", "Asia", "Europe", "North America", "Oceania", "South America"]

const countriesArray = Object.entries(countries);
export const allCountriesArray = countriesArray.map(country => country[1].name);

const europeCountries = countriesArray.filter(country => country[1].continent === "EU")
export const europeCountriesArray = europeCountries.map(country => country[1].name);

const africaCountries = countriesArray.filter(country => country[1].continent === "AF")
export const africaCountriesArray = africaCountries.map(country => country[1].name);

const asiaCountries = countriesArray.filter(country => country[1].continent === "AS")
export const asiaCountriesArray = asiaCountries.map(country => country[1].name);

const northAmericaCountries = countriesArray.filter(country => country[1].continent === "NA")
export const northAmericaCountriesArray = northAmericaCountries.map(country => country[1].name);

const southAmericaCountries = countriesArray.filter(country => country[1].continent === "SA")
export const southAmericaCountriesArray = southAmericaCountries.map(country => country[1].name);

const oceaniaCountries = countriesArray.filter(country => country[1].continent === "OC")
export const oceaniaCountriesArray = oceaniaCountries.map(country => country[1].name);