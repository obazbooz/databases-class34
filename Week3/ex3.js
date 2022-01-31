import mysql from 'mysql';
import prompt from 'prompt';
import util from 'util';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
  multipleStatements: true,
});

// prompt.start();

// // Get two properties from the user: username and email
// prompt.get(['Country', 'name', 'code', 'cb'], function (err, result) {
//   // Log the results.
//   console.log('Command-line input received:');
//   console.log('  Country: ' + result.Country);
//   console.log('  name: ' + result.name);
//   console.log('  code: ' + result.code);
//   console.log('  cb: ' + result.cb);
// });

const execQuery = util.promisify(connection.query.bind(connection));
const input = util.promisify(prompt.get.bind(this));

async function queryDatabase() {
  let Country = '';
  let name = '';
  let code = '';
  //let cb = '';
  prompt.start();
  try {
    const result = await input(['Country', 'name', 'code']);
    Country = result.Country;
    name = result.name;
    code = result.code;
    // cb = result.cb;

    // 1. Naive way of passing the parameter to the query
    // const select_query = `select * from employees WHERE employee_id =  ${input_number};`;
    //const select_query = `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`;
    const select_query =
      `SELECT Population FROM ${Country} WHERE Name =` +
      connection.escape(name) +
      `and code =` +
      connection.escape(code);
    //const select_query = `SELECT Population FROM ${Country} WHERE Name = ?`;

    // 2. Escaping the parameter ( replacing the unwanted characters)
    //const select_query = `select * from employees WHERE employee_id =` + connection.escape(input_number);

    // 3. Using a question mark syntax to do the escaping
    //const select_query = `select * from employees WHERE employee_id = ?`

    connection.connect();
    console.log(select_query);
    const results = await execQuery(select_query);
    // for (r of results) {
    //   console.log(r);
    // }
    console.log(results);
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

queryDatabase();
