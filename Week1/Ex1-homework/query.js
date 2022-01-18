/*
  This file contains string variables contain the sql queries and 
  two functions contain sql statements to create and delete Database.
*/

export let ShowDatabasesQuery = `SHOW DATABASES `;

export let createInviteeTableQuery =
  'create table Invitee (invitee_no int, invitee_name varchar(50), invited_by varchar(50))';

export let createRoomTableQuery =
  'create table Room  (room_no int, room_name varchar(50), floor_number int)';

export let createMeetingTableQuery =
  'create table Meeting  (meeting_no int, meeting_title text, starting_time time, ending_time time)';

export function createDatabase(databaseName) {
  return `create database ${databaseName}`;
}

export function deleteDatabase(databaseName) {
  return `drop database ${databaseName}`;
}
