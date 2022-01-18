export let populationMoreEightMillion =
  'select Name from country where Population > 8000000';
export let countryNameHasLandQuery =
  "select Name from country where Name like '%land%'";
export let populationLessOneMillionAndMoreFiveHundredThousandQuery =
  'select Name from country where Population between 500000 and 1000000';
export let countriesInContinentEuropeQuery =
  "select Name from country where Continent like 'Europe'";
export let descendingOrderOfSurfaceAreasQuery =
  'select Name from country order by SurfaceArea DESC';
export let NetherlandsCitiesQuery =
  'select Name from city where CountryCode like "NLD"';
export let RotterdamPopulationQuery =
  "select Population from city where Name =  'Rotterdam'";
export let topTenSurfaceAreaQuery =
  'select Name from country order by SurfaceArea desc limit 10';
export let topTenPopulationQuery =
  'select Name from country order by Population desc limit 10';
export let worldPopulationQuery =
  'select sum(Population) as world_Population from country';
