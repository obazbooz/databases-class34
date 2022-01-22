// This file contains all the sql statements as a string variables.

export const populationMoreEightMillion =
  'SELECT Name FROM country WHERE Population > 8000000';

export const countryNameHasLandQuery =
  "SELECT Name FROM country WHERE Name LIKE '%land%'";

export const populationLessOneMillionAndMoreFiveHundredThousandQuery =
  'SELECT Name FROM country WHERE Population BETWEEN 500000 AND 1000000';

export const countriesInContinentEuropeQuery =
  "SELECT Name FROM country WHERE Continent LIKE 'Europe'";

export const descendingORDEROfSurfaceAreasQuery =
  'SELECT Name FROM country ORDER BY SurfaceArea DESC';

export const netherlandsCitiesQuery =
  'SELECT Name FROM city WHERE CountryCode LIKE "NLD"';

export const rotterdamPopulationQuery =
  "SELECT Population FROM city WHERE Name =  'Rotterdam'";

export const topTenSurfaceAreaQuery =
  'SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10';

export const topTenPopulationQuery =
  'SELECT Name FROM country ORDER BY Population DESC LIMIT 10';

export const worldPopulationQuery =
  'SELECT SUM(Population) AS world_Population FROM country';
