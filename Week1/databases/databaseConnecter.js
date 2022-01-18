import mysql from 'mysql';
import { populationMoreEightMillion } from './queries.js';
import { countryNameHasLandQuery } from './queries.js';
import { populationLessOneMillionAndMoreFiveHundredThousandQuery } from './queries.js';
import { countriesInContinentEuropeQuery } from './queries.js';
import { descendingOrderOfSurfaceAreasQuery } from './queries.js';
import { NetherlandsCitiesQuery } from './queries.js';
import { RotterdamPopulationQuery } from './queries.js';
import { topTenSurfaceAreaQuery } from './queries.js';
import { topTenPopulationQuery } from './queries.js';
import { worldPopulationQuery } from './queries.js';

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'HYFdatabase',
  database: 'world',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Server connected!');
});

//What are the names of countries with population greater than 8 million?
connection.query(populationMoreEightMillion, (error, results) => {
  if (error) {
    throw error;
  }
  let rows = JSON.parse(JSON.stringify(results));
  console.log(rows);
});

//What are the names of countries that have “land” in their names?
connection.query(countryNameHasLandQuery, (error, results) => {
  if (error) {
    throw error;
  }
  let rows = JSON.parse(JSON.stringify(results));
  console.log(rows);
});

//What are the names of the cities with population in between 500,000 and 1 million?
connection.query(
  populationLessOneMillionAndMoreFiveHundredThousandQuery,
  (error, results) => {
    if (error) {
      throw error;
    }
    let rows = JSON.parse(JSON.stringify(results));
    console.log(rows);
  },
);

//What's the name of all the countries on the continent ‘Europe’?
connection.query(countriesInContinentEuropeQuery, (error, results) => {
  if (error) {
    throw error;
  }
  let rows = JSON.parse(JSON.stringify(results));
  console.log(rows);
});

//List all the countries in the descending order of their surface areas.
connection.query(descendingOrderOfSurfaceAreasQuery, (error, results) => {
  if (error) {
    throw error;
  }
  let rows = JSON.parse(JSON.stringify(results));
  console.log(
    'List all the countries in the descending order of their surface areas.',
  );
  console.log(rows);
});

//What are the names of all the cities in the Netherlands?
connection.query(NetherlandsCitiesQuery, (error, results) => {
  if (error) {
    throw error;
  }
  let rows = JSON.parse(JSON.stringify(results));
  console.log('What are the names of all the cities in the Netherlands?');
  console.log(rows);
});

//What is the population of Rotterdam?
connection.query(RotterdamPopulationQuery, (error, results) => {
  if (error) {
    throw error;
  }
  let rows = JSON.parse(JSON.stringify(results));
  console.log('What is the population of Rotterdam?');
  console.log(rows);
});

//What's the top 10 countries by Surface Area?
connection.query(topTenSurfaceAreaQuery, (error, results) => {
  if (error) {
    throw error;
  }
  let rows = JSON.parse(JSON.stringify(results));
  console.log('What is the top 10 countries by Surface Area?');
  console.log(rows);
});

//What's the top 10 most populated cities?
connection.query(topTenPopulationQuery, (error, results) => {
  if (error) {
    throw error;
  }
  let rows = JSON.parse(JSON.stringify(results));
  console.log('What is the top 10 most populated cities?');
  console.log(rows);
});

//What is the population number of the world?
connection.query(worldPopulationQuery, (error, results) => {
  if (error) {
    throw error;
  }
  let rows = JSON.parse(JSON.stringify(results));
  console.log('What is the population number of the world?');
  console.log(rows);
});

connection.end();