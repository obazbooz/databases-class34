import mysql from 'mysql';
import util from 'util';
import { accountValues } from './tables-values.js';

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

    const insertAccountValues = `INSERT INTO account SET ?;`;
    accountValues.forEach(async (value) => {
      await execQuery(insertAccountValues, value);
    });

    await execQuery('COMMIT');
  } catch (error) {
    console.error(error);
    await execQuery('ROLLBACK');
  }

  connection.end();
}

seedDatabase();
