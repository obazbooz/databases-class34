import mysql from 'mysql';

// Connection configurations to database
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfuser',
  database: 'thesis',
});

// Object of sql queries
const queries = {
  researchAndNumberOfAuthorsQuery: `
  SELECT COUNT(authors.author_name),research_papers.paper_title
  FROM authors
  LEFT JOIN author_research ON authors.author_no= author_research.author_no
  LEFT JOIN research_papers ON research_papers.paper_id=author_research.paper_id
  GROUP BY research_papers.paper_title
  `,
  numOfResearchesPublishedByFemaleQuery: `
  SELECT Count(distinct(research_papers.paper_title)) AS number_of_published_researches_by_females 
  FROM authors
  LEFT JOIN author_research ON authors.author_no= author_research.author_no
  LEFT JOIN research_papers ON research_papers.paper_id=author_research.paper_id
  GROUP BY authors.gender
  HAVING authors.gender = 'f'
  `,
  AverageOfHindexQuery: `
  SELECT AVG(research_papers.h_index) AS h_index_avg , authors.university
  FROM authors
  LEFT JOIN author_research ON authors.author_no= author_research.author_no
  LEFT JOIN research_papers ON research_papers.paper_id=author_research.paper_id
  GROUP BY authors.university
  `,
  numOfResearchesPublishedByUniversityQuery: `
  SELECT COUNT(research_papers.paper_id) AS number_of_published_researches_by_university , authors.university
  FROM authors
  LEFT JOIN author_research ON authors.author_no= author_research.author_no
  LEFT JOIN research_papers ON research_papers.paper_id=author_research.paper_id
  GROUP BY authors.university
  `,
  minAndMaxValuesForHindexQuery: `
  SELECT MIN(research_papers.h_index) AS minimum_h_index_avg , MAX(research_papers.h_index) AS maximum_h_index_avg ,authors.university
  FROM authors
  LEFT JOIN author_research ON authors.author_no= author_research.author_no
  LEFT JOIN research_papers ON research_papers.paper_id=author_research.paper_id
  GROUP BY authors.university
  `,
};

// Connect to database server
connection.connect((err) => {
  if (err) throw err;
  console.log('Server connected!');
});

function queriesExecuterFunc() {
  for (const query in queries) {
    connection.query(queries[query], (error, results) => {
      if (error) {
        throw error;
      }
      let rows = JSON.parse(JSON.stringify(results));
      if (query == 'researchAndNumberOfAuthorsQuery') {
        console.log(
          'All research papers and the number of authors that wrote that paper',
        );
        console.log(rows);
      } else if (query == 'numOfResearchesPublishedByFemaleQuery') {
        console.log(
          'Sum of the research papers published by all female authors.',
        );
        console.log(rows);
      } else if (query == 'AverageOfHindexQuery') {
        console.log('Average of the h-index of all authors per university.');
        console.log(rows);
      } else if (query == 'numOfResearchesPublishedByUniversityQuery') {
        console.log(
          'Sum of the research papers of the authors per university.',
        );
        console.log(rows);
      } else if (query == 'minAndMaxValuesForHindexQuery') {
        console.log(
          'Minimum and maximum of the h-index of all authors per university.',
        );
        console.log(rows);
      }
    });
  }
}

queriesExecuterFunc();

//End the connection to the database
connection.end(() => {
  console.log('Server disconnected!');
});
