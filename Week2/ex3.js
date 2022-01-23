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
SELECT author_name, paper_title
FROM authors
LEFT JOIN research_papers ON authors.author_no= research_papers.author_no
order by author_name ASC
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
