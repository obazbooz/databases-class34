import mysql from 'mysql';

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfuser',
  database: 'thesis',
});

const authorsNameAndMentorQuery = `
select author_name , mentor
from authors;
`;

const authorsNameAndPaperTitleQuery = `
SELECT authors.author_name,university,date_of_birth,gender,mentor,research_papers.paper_title,conference,publish_date
FROM authors
LEFT JOIN author_research ON authors.author_no= author_research.author_no
LEFT JOIN research_papers ON research_papers.paper_id=author_research.paper_id
`;

//Connect to the Database server
connection.connect((err) => {
  if (err) throw err;
  console.log('Server connected!');
});

function authorsNameAndMentorFunc() {
  connection.query(authorsNameAndMentorQuery, (error, results) => {
    if (error) {
      throw error;
    }
    const rows = JSON.parse(JSON.stringify(results));
    console.log('Names of authors ');
    console.log(rows);
  });
}

function authorsNameAndPaperTitleFunc() {
  connection.query(authorsNameAndPaperTitleQuery, (error, results) => {
    if (error) {
      throw error;
    }
    const rows = JSON.parse(JSON.stringify(results));
    console.log('Names of authors and papers title if available ');
    console.log(rows);
  });
}

authorsNameAndMentorFunc();
authorsNameAndPaperTitleFunc();

connection.end(() => {
  console.log('Server disconnected!');
});
