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
  authorsNameAndMentorQuery: `
  select author_name , mentor
  from authors;
  `,
  authorsNameAndPaperTitleQuery: `
  SELECT authors.author_name,university,date_of_birth,gender,mentor,research_papers.paper_title,conference,publish_date
  FROM authors
  LEFT JOIN author_research ON authors.author_no= author_research.author_no
  LEFT JOIN research_papers ON research_papers.paper_id=author_research.paper_id
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
      if (query == 'authorsNameAndMentorQuery') {
        console.log('Names of authors and their corresponding mentors');
        console.log(rows);
      } else if (query == 'authorsNameAndPaperTitleQuery') {
        console.log('Names of authors and papers title if available ');
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
