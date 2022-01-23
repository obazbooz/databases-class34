import mysql from 'mysql';

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfuser',
  database: 'thesis',
});

const createTableQuery =
  'CREATE TABLE research_Papers(paper_id int PRIMARY KEY, paper_title VARCHAR(50),conference VARCHAR(50), publish_date DATE);';
const addColumnQuery = 'ALTER TABLE research_Papers ADD COLUMN author_no int;';
const addForeignKeyQuery =
  ' ALTER TABLE research_Papers ADD CONSTRAINT fk_author_no FOREIGN KEY(author_no) REFERENCES authors(author_no);';
const addAuthorsRowsQuery = `
INSERT INTO authors (author_no , author_name , university , date_of_birth , mentor)
VALUES
(1,"Osama","Pecs",'1990-07-23',1),
(2,"Mohammad","Pecs",'1992-09-02',2),
(3,"Essam nora","Damascus",'1995-10-02',3),
(4,"Noor","Amsterdam",'1996-05-22',4),
(5,"Ali","Amsterdam",'1990-09-21',5),
(6,"Lily","Amsterdam",'1991-06-06',6),
(7,"Sara","Pecs",'1995-05-07',7),
(8,"Hassan","Pecs",'1993-02-01',8),
(9,"Nily","Pecs",'1989-12-22',9),
(10,"Riad","Amsterdam",'1993-01-20',10),
(11,"Nazek","Amsterdam",'1990-02-19',11),
(12,"Abu","Damascus",'1987-03-28',12),
(13,"Eshnit","Damascus",'1982-05-02',13),
(14,"Viki","Damascus",'1988-09-07',14),
(15,"Marry","Damascus",'1990-11-02',15);
`;

const addResearchPapersRowsQuery = `
INSERT INTO research_papers (paper_id , paper_title , conference , publish_date , author_no)
VALUES
(1,"Databases","Pecs conference",'2020-06-20',1),
(2,"AI","Pecs conference",'2020-08-20',1),
(3,"Robotics","Pecs conference",'2021-06-20',1),
(4,"Image processing","Pecs conference",'2022-07-20',1),
(5,"nature","Damascus conference",'2021-06-20',3),
(6,"trees","Damascus conference",'2020-01-05',3),
(7,"Fields and farming","Damascus conference",'2019-01-20',3),
(8,"English studies","Pecs conference",'2020-04-05',2),
(9,"English for kids","Pecs conference",'2021-06-20',2),
(10,"Basics of starting","Pecs conference",'2019-08-20',2),
(11,"CARS","Amsterdam conference",'2020-06-20',4),
(12,"F1","Amsterdam conference",'2022-07-20',4),
(13,"Rich fish","Amsterdam conference",'2018-05-20',5),
(14,"Ocean","Amsterdam conference",'2022-06-20',5),
(15,"Database for everyone","Amsterdam conference",'2020-06-20',6),
(16,"C++","Pecs conference",'2017-01-20',7),
(17,"Java","Pecs conference",'2016-05-20',8),
(18,"Python","Pecs conference",'2020-09-20',9),
(19,"Tigers in jangles","Amsterdam conference",'2015-11-20',10),
(20,"Math for basis","Amsterdam conference",'2022-08-20',11),
(21,"since","Amsterdam conference",'2017-06-20',11),
(22,"Easy math","Amsterdam conference",'2018-11-20',11),
(23,"Sin and Cos","Amsterdam conference",'2014-01-05',11),
(24,"Areas","Amsterdam conference",'2019-08-02',11),
(25,"Bi values","Pecs conference",'2018-06-20',11),
(26,"eyes beauty","Damascus conference",'2017-07-21',12),
(27,"Body secrets ","Damascus conference",'2020-08-23',12),
(28,"Healthy life","Damascus conference",'2022-09-25',12),
(29,"Food routines","Damascus conference",'2021-10-22',12),
(30,"Happier life with vegetables","Damascus conference",'2020-06-20',12);
`;
//Connect to the Database server
connection.connect((err) => {
  if (err) throw err;
  console.log('Server connected!');
});

function createTable() {
  connection.query(createTableQuery, (error, results) => {
    if (error) {
      throw error;
    }
    console.log('Table created');
  });
}

function addColumn() {
  connection.query(addColumnQuery, (error, results) => {
    if (error) {
      throw error;
    }
    console.log('Column added');
  });
}

function addForeignKey() {
  connection.query(addForeignKeyQuery, (error, results) => {
    if (error) {
      throw error;
    }
    console.log('Foreign key added');
  });
}

function addAuthorRowsFun() {
  connection.query(addAuthorsRowsQuery, (error, results) => {
    if (error) {
      throw error;
    }
    console.log('Rows added');
  });
}

function addResearchPapersRowsFunc() {
  connection.query(addResearchPapersRowsQuery, (error, results) => {
    if (error) {
      throw error;
    }
    console.log('Rows added');
  });
}

createTable();
addColumn();
addForeignKey();
addAuthorRowsFun();
addResearchPapersRowsFunc();
connection.end(() => {
  console.log('Server disconnected!');
});
