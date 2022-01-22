import mysql from 'mysql';
import { showDatabasesQuery } from './query.js';
import { createInviteeTableQuery } from './query.js';
import { createRoomTableQuery } from './query.js';
import { createMeetingTableQuery } from './query.js';
import { createDatabase } from './query.js';
import { deleteDatabase } from './query.js';

//Server connection configurations.
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfuser',
});

//Connect to the Database server.
connection.connect((err) => {
  if (err) throw err;
  console.log('Server connected!');
});

//Function to get a list of the Databases on the Database Server.
const databaseListFunc = () => {
  return new Promise((resolve, reject) => {
    connection.query(showDatabasesQuery, (error, results) => {
      if (error) {
        reject(error);
      } else {
        let databases = JSON.parse(JSON.stringify(results));
        resolve(databases);
      }
    });
  });
};

//  Function to delete the "meetup" Database if it's existing.
const deleteDatabaseFunc = (databaseList) => {
  return new Promise((resolve, reject) => {
    let found = false;
    found = databaseList.some((databaseItem) =>
      databaseItem.Database === 'meetup' ? true : false,
    );
    if (found) {
      connection.query(deleteDatabase('meetup'), (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(console.log(`Database Deleted`));
        }
      });
    } else {
      resolve(console.log(`No initial database found!`));
    }
  });
};

// Function to create a Database named "meetup".
const createDatabaseFunc = () => {
  return new Promise((resolve, reject) => {
    connection.query(createDatabase('meetup'), (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(console.log(`Database created`));
      }
    });
  });
};

// Function to change the Database user.
const changeUserFunc = () => {
  return new Promise((resolve, reject) => {
    connection.changeUser({ database: 'meetup' }, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(console.log(`Server user changed!`));
      }
    });
  });
};

//Function to create entity called "Invitee".
const createInviteeTableFunc = () => {
  return new Promise((resolve, reject) => {
    connection.query(createInviteeTableQuery, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(console.log(`table Invitee has been successfully created`));
    });
  });
};

//Function to create entity called "room".
const createRoomTableFunc = () => {
  return new Promise((resolve, reject) => {
    connection.query(createRoomTableQuery, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(console.log(`table Room has been successfully created`));
    });
  });
};

//Function to create entity called "meeting".
const createMeetingTableFunc = () => {
  return new Promise((resolve, reject) => {
    connection.query(createMeetingTableQuery, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(console.log(`table Meeting has been successfully created`));
    });
  });
};

// Function to end the connection to the "meetup" Database
const endConnectionFunc = () => {
  return new Promise((resolve, reject) => {
    connection.end();
    resolve(console.log(`Connection ended`));
  });
};

// Function to call the Database queries asynchronously.
async function queriesFunc() {
  try {
    const databaseList = await databaseListFunc();
    const deleteInitDatabase = await deleteDatabaseFunc(databaseList);
    const createInitDatabase = await createDatabaseFunc();
    const changeUser = await changeUserFunc();
    const createInviteeTable = await createInviteeTableFunc();
    const createRoomTable = await createRoomTableFunc();
    const createMeetingTable = await createMeetingTableFunc();
    const endConnection = await endConnectionFunc();
  } catch (error) {
    console.log(error);
  }
}

queriesFunc();
