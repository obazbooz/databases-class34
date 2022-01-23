import mysql from 'mysql';

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfuser',
  database: 'thesis',
});

const researchAndNumberOfAuthorsQuery = `
SELECT COUNT(authors.author_name),research_papers.paper_title
FROM authors
LEFT JOIN author_research ON authors.author_no= author_research.author_no
LEFT JOIN research_papers ON research_papers.paper_id=author_research.paper_id
GROUP BY research_papers.paper_title
`;

const numOfResearchesPublishedByFemaleQuery = `
SELECT COUNT(research_papers.paper_id) AS number_of_published_researches_by_females 
FROM authors
LEFT JOIN author_research ON authors.author_no= author_research.author_no
LEFT JOIN research_papers ON research_papers.paper_id=author_research.paper_id
GROUP BY authors.gender
HAVING authors.gender = 'f'
`;

const numOfResearchesPublishedByUniversityQuery = `
SELECT COUNT(research_papers.paper_id) AS number_of_published_researches_by_university , authors.university
FROM authors
LEFT JOIN author_research ON authors.author_no= author_research.author_no
LEFT JOIN research_papers ON research_papers.paper_id=author_research.paper_id
GROUP BY authors.university
`;

const AverageOfHindexQuery = `
SELECT AVG(research_papers.h_index) AS h_index_avg , authors.university
FROM authors
LEFT JOIN author_research ON authors.author_no= author_research.author_no
LEFT JOIN research_papers ON research_papers.paper_id=author_research.paper_id
GROUP BY authors.university
`;

const minAndMaxValuesForHindexQuery = `
SELECT MIN(research_papers.h_index) AS minimum_h_index_avg , MAX(research_papers.h_index) AS maximum_h_index_avg ,authors.university
FROM authors
LEFT JOIN author_research ON authors.author_no= author_research.author_no
LEFT JOIN research_papers ON research_papers.paper_id=author_research.paper_id
GROUP BY authors.university
`;

//Connect to the Database server
connection.connect((err) => {
  if (err) throw err;
  console.log('Server connected!');
});

function researchAndNumberOfAuthorsFunction() {
  connection.query(researchAndNumberOfAuthorsQuery, (error, results) => {
    if (error) {
      throw error;
    }
    const rows = JSON.parse(JSON.stringify(results));
    console.log('Names of authors ');
    console.log(rows);
  });
}

function numOfResearchesPublishedByFemaleFunc() {
  connection.query(numOfResearchesPublishedByFemaleQuery, (error, results) => {
    if (error) {
      throw error;
    }
    const rows = JSON.parse(JSON.stringify(results));
    console.log('Names of authors and papers title if available ');
    console.log(rows);
  });
}

function AverageOfHindexFunc() {
  connection.query(AverageOfHindexQuery, (error, results) => {
    if (error) {
      throw error;
    }
    const rows = JSON.parse(JSON.stringify(results));
    console.log('Names of authors and papers title if available ');
    console.log(rows);
  });
}

function numOfResearchesPublishedByUniversityFunc() {
  connection.query(
    numOfResearchesPublishedByUniversityQuery,
    (error, results) => {
      if (error) {
        throw error;
      }
      const rows = JSON.parse(JSON.stringify(results));
      console.log('Names of authors and papers title if available ');
      console.log(rows);
    },
  );
}

function minAndMaxValuesForHindexFunc() {
  connection.query(minAndMaxValuesForHindexQuery, (error, results) => {
    if (error) {
      throw error;
    }
    const rows = JSON.parse(JSON.stringify(results));
    console.log('Names of authors and papers title if available ');
    console.log(rows);
  });
}

researchAndNumberOfAuthorsFunction();
numOfResearchesPublishedByFemaleFunc();
AverageOfHindexFunc();
numOfResearchesPublishedByUniversityFunc();
minAndMaxValuesForHindexFunc();

connection.end(() => {
  console.log('Server disconnected!');
});
