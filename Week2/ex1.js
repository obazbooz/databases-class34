import mysql from 'mysql';

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfuser',
  database: 'thesis',
});

const createTableQuery =
  'CREATE TABLE authors(author_no int PRIMARY KEY, author_name VARCHAR(50),university VARCHAR(50), date_of_birth DATE);';
const addColumnQuery = 'ALTER TABLE authors ADD COLUMN mentor INT;';
const addForeignKeyQuery =
  ' ALTER TABLE authors ADD CONSTRAINT fk_mentor FOREIGN KEY(mentor) REFERENCES authors(author_no);';
//Connect to the Database server
connection.connect((err) => {
  if (err) throw err;
  console.log('Server connected!');
});

function createTableFunc() {
  connection.query(createTableQuery, (error, results) => {
    if (error) {
      throw error;
    }
    console.log('Table created');
  });
}

function addColumnFunc() {
  connection.query(addColumnQuery, (error, results) => {
    if (error) {
      throw error;
    }
    console.log('Column added');
  });
}

function addForeignKeyFunc() {
  connection.query(addForeignKeyQuery, (error, results) => {
    if (error) {
      throw error;
    }
    console.log('Foreign key added');
  });
}

createTableFunc();
addColumnFunc();
addForeignKeyFunc();

connection.end(() => {
  console.log('Server disconnected!');
});
