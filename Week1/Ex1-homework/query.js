/*
  This file contains string variables contain the sql queries and 
  two functions contain sql statements to create and delete Database.
*/

export const showDatabasesQuery = `SHOW DATABASES `;

export const createInviteeTableQuery =
  'CREATE TABLE Invitee (invitee_no INT, invitee_name VARCHAR(50), invited_by VARCHAR(50))';

export const createRoomTableQuery =
  'CREATE TABLE Room  (room_no INT, room_name VARCHAR(50), floor_number INT)';

export const createMeetingTableQuery =
  'CREATE TABLE Meeting  (meeting_no INT, meeting_title text, starting_time TIMESTAMP, ending_time TIMESTAMP)';

export function createDatabase(databaseName) {
  return `Create DATABASE ${databaseName}`;
}

export function deleteDatabase(databaseName) {
  return `DROP DATABASE ${databaseName}`;
}
