//An example of a value that can be passed as name and code that would take advantage of SQL-injection
// ' or 1=1 #

function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name =` +
      connection.escape(name) +
      `and code =` +
      connection.escape(code),
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error('Not found'));
      cb(null, result[0].name);
    },
  );
}
