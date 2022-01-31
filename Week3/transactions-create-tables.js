import mysql from 'mysql';
import util from 'util';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'bank',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  connection.connect();

  try {
    await execQuery('START TRANSACTION');

    const createAccountTAble = `
    CREATE TABLE account
    (account_number INT PRIMARY KEY, balance FLOAT);`;
    await execQuery(createAccountTAble);

    const createAccountChangesTable = `
    CREATE TABLE account_changes
    (change_number INT PRIMARY KEY, account_number INT, amount FLOAT,
    changed_date DATETIME, remark VARCHAR(500),
    FOREIGN KEY (account_number) REFERENCES account(account_number)
    );`;
    await execQuery(createAccountChangesTable);

    await execQuery('COMMIT');
  } catch (error) {
    console.error(error);
    await execQuery('ROLLBACK');
  }

  connection.end();
}

seedDatabase();
