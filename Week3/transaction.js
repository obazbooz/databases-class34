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

    const updateSenderAccount = `
    UPDATE account SET balance = 
    balance - 1000 WHERE account_number = 100000001;`;
    await execQuery(updateSenderAccount);

    const updateSenderChanges = `
    INSERT INTO account_changes (change_number,account_number,amount,changed_date,remark) 
    VALUES (10001,100000001,-1000,"2021-01-15 06:59:50","transaction done!");`;
    await execQuery(updateSenderChanges);

    const updateReceiverAccount = `
    UPDATE account SET balance = 
    balance + 1000 WHERE account_number = 100000002;`;
    await execQuery(updateReceiverAccount);

    const updateReceiverChanges = `
    INSERT INTO account_changes (change_number,account_number,amount,changed_date,remark) 
    VALUES (10002,100000002,1000,"2021-01-15 07:59:50","transaction done!");`;
    await execQuery(updateReceiverChanges);

    await execQuery('COMMIT');
  } catch (error) {
    console.error(error);
    await execQuery('ROLLBACK');
  }

  connection.end();
}

seedDatabase();
