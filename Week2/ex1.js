import mysql from 'mysql';
import util from 'util';

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
    createTableQuery: `
    CREATE TABLE authors
    (author_no INT PRIMARY KEY, author_name VARCHAR(300), university VARCHAR(300),
    date_of_birth DATE, gender ENUM('m','f'));
    `,
    addColumnQuery: `
    ALTER TABLE authors ADD COLUMN mentor INT;
    `,
    addForeignKeyQuery: `
    ALTER TABLE authors ADD CONSTRAINT
    fk_mentor FOREIGN KEY(mentor) 
    REFERENCES authors(author_no);
    `,
  };

  // Connect to database server
  connection.connect((err) => {
    if (err) throw err;
    console.log('Server connected!');
  });

  try {
    await execQuery(queries.createTableQuery);
    await execQuery(queries.addColumnQuery);
    await execQuery(queries.addForeignKeyQuery);
  } catch (error) {
    console.error(error);
  }

  //End the connection to the database
  connection.end(() => {
    console.log('Server disconnected!');
  });
}

seedDatabase();
