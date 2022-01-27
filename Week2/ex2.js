import mysql from 'mysql';
import util from 'util';
import { authorsArray } from './databaseConstant.js';
import { researchPapersArray } from './databaseConstant.js';
import { authorsResearchArray } from './databaseConstant.js';

// Connection configurations to database
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfuser',
  database: 'thesis',
});

//Promise method to make sql query to the database
const execQuery = util.promisify(connection.query.bind(connection));

//Async function to seed data from the database
async function seedDatabase() {
  // Object of sql queries
  const queries = {
    createResearchPapersTableQuery: `
    CREATE TABLE research_papers
    (paper_id INT PRIMARY KEY, paper_title VARCHAR(500),conference VARCHAR(400), publish_date DATE, h_index smallint);
    `,
    createAuthorsResearchTableQuery: `
    CREATE TABLE author_research(author_no INT , paper_id INT);
    `,
    alterAuthorsResearchTableAuthorFkQuery: `
    ALTER TABLE author_research ADD 
    CONSTRAINT fk_author_no FOREIGN KEY(author_no) REFERENCES authors(author_no);
    `,
    alterAuthorsResearchTablePaperFkQuery: `
    ALTER TABLE author_research ADD CONSTRAINT 
    fk_paper_id FOREIGN KEY(paper_id) 
    REFERENCES research_papers(paper_id);
    `,
    addAuthorsRowsQuery: `
    INSERT INTO authors SET ?;
    `,

    addResearchPapersRowsQuery: `
    INSERT INTO research_papers SET ?;
    `,
    addAuthorsResearchRowsQuery: `
    INSERT INTO author_research SET ?;
    `,
  };

  //Connect to database server
  connection.connect((err) => {
    if (err) throw err;
    console.log('Server connected!');
  });

  try {
    await execQuery(queries.createResearchPapersTableQuery);
    await execQuery(queries.createAuthorsResearchTableQuery);
    await execQuery(queries.alterAuthorsResearchTableAuthorFkQuery);

    authorsArray.forEach(async (author) => {
      await execQuery(queries.addAuthorsRowsQuery, author);
    });
    researchPapersArray.forEach(async (paper) => {
      await execQuery(queries.addResearchPapersRowsQuery, paper);
    });
    authorsResearchArray.forEach(async (tableRow) => {
      await execQuery(queries.addAuthorsResearchRowsQuery, tableRow);
    });
  } catch (error) {
    console.error(error);
  }

  //End the connection to the database
  connection.end(() => {
    console.log('Server disconnected!');
  });
}

seedDatabase();
