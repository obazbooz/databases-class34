import mysql from 'mysql';

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfuser',
  database: 'thesis',
});

const createResearchPapersTableQuery =
  'CREATE TABLE research_papers(paper_id int PRIMARY KEY, paper_title VARCHAR(50),conference VARCHAR(50), publish_date DATE, h_index smallint);';

const createAuthorsResearchTableQuery = `
CREATE TABLE author_research(author_no int , paper_id int);
`;
const alterAuthorsResearchTableAuthorFkQuery = `
ALTER TABLE author_research ADD CONSTRAINT fk_author_no FOREIGN KEY(author_no) REFERENCES authors(author_no);
`;
const alterAuthorsResearchTablePaperFkQuery = `
ALTER TABLE author_research ADD CONSTRAINT fk_paper_id FOREIGN KEY(paper_id) REFERENCES research_papers(paper_id);
`;

const addAuthorsRowsQuery = `
INSERT INTO authors (author_no , author_name , university , date_of_birth , mentor, gender)
VALUES
(1,"Osama","Pecs",'1990-07-23',1,'m'),
(2,"Mohammad","Pecs",'1992-09-02',1,'m'),
(3,"Essam nora","Damascus",'1995-10-02',1,'m'),
(4,"Noor","Amsterdam",'1996-05-22',1,'f'),
(5,"Ali","Amsterdam",'1990-09-21',2,'m'),
(6,"Lily","Amsterdam",'1991-06-06',2,'f'),
(7,"Sara","Pecs",'1995-05-07',7,'f'),
(8,"Hassan","Pecs",'1993-02-01',3,'m'),
(9,"Nily","Pecs",'1989-12-22',5,'f'),
(10,"Riad","Amsterdam",'1993-01-20',5,'m'),
(11,"Nazek","Amsterdam",'1990-02-19',5,'f'),
(12,"Abu","Damascus",'1987-03-28',5,'m'),
(13,"Eshnit","Damascus",'1982-05-02',10,'f'),
(14,"Viki","Damascus",'1988-09-07',10,'f'),
(15,"Marry","Damascus",'1990-11-02',10,'f');
`;

const addResearchPapersRowsQuery = `
INSERT INTO research_papers (paper_id , paper_title , conference , publish_date, h_index)
VALUES
(1,"Databases","Pecs conference",'2020-06-20',100),
(2,"AI","Pecs conference",'2020-08-20',40),
(3,"Robotics","Pecs conference",'2021-06-20',50),
(4,"Image processing","Pecs conference",'2022-07-20',50),
(5,"nature","Damascus conference",'2021-06-20',78),
(6,"trees","Damascus conference",'2020-01-05',45),
(7,"Fields and farming","Damascus conference",'2019-01-20',80),
(8,"English studies","Pecs conference",'2020-04-05',33),
(9,"English for kids","Pecs conference",'2021-06-20',21),
(10,"Basics of starting","Pecs conference",'2019-08-20',54),
(11,"CARS","Amsterdam conference",'2020-06-20',45),
(12,"F1","Amsterdam conference",'2022-07-20',36),
(13,"Rich fish","Amsterdam conference",'2018-05-20',78),
(14,"Ocean","Amsterdam conference",'2022-06-20',90),
(15,"Database for everyone","Amsterdam conference",'2020-06-20',15),
(16,"C++","Pecs conference",'2017-01-20',45),
(17,"Java","Pecs conference",'2016-05-20',96),
(18,"Python","Pecs conference",'2020-09-20',78),
(19,"Tigers in jangles","Amsterdam conference",'2015-11-20',87),
(20,"Math for basis","Amsterdam conference",'2022-08-20',11),
(21,"since","Amsterdam conference",'2017-06-20',08),
(22,"Easy math","Amsterdam conference",'2018-11-20',74),
(23,"Sin and Cos","Amsterdam conference",'2014-01-05',10),
(24,"Areas","Amsterdam conference",'2019-08-02',20),
(25,"Bi values","Pecs conference",'2018-06-20',45),
(26,"eyes beauty","Damascus conference",'2017-07-21',40),
(27,"Body secrets ","Damascus conference",'2020-08-23',50),
(28,"Healthy life","Damascus conference",'2022-09-25',66),
(29,"Food routines","Damascus conference",'2021-10-22',70),
(30,"Happier life with vegetables","Damascus conference",'2020-06-20',09);
`;

const addAuthorsResearchRowsQuery = `
INSERT INTO author_research (author_no , paper_id)
VALUES
(1,1),
(1,2),
(1,3),
(1,4),
(2,5),
(3,6),
(4,6),
(5,7),
(6,1),
(13,28),
(14,28),
(15,29),
(15,30);
`;

//Connect to the Database server
connection.connect((err) => {
  if (err) throw err;
  console.log('Server connected!');
});

function createResearchPapersTableFunc() {
  connection.query(createResearchPapersTableQuery, (error, results) => {
    if (error) {
      throw error;
    }
    console.log('Table created');
  });
}

function createAuthorsResearchTableFunc() {
  connection.query(createAuthorsResearchTableQuery, (error, results) => {
    if (error) {
      throw error;
    }
    console.log('Table created');
  });
}

function alterAuthorsResearchTableAuthorFkFunc() {
  connection.query(alterAuthorsResearchTableAuthorFkQuery, (error, results) => {
    if (error) {
      throw error;
    }
    console.log('Table created');
  });
}

function alterAuthorsResearchTablePaperFkFunc() {
  connection.query(alterAuthorsResearchTablePaperFkQuery, (error, results) => {
    if (error) {
      throw error;
    }
    console.log('Table created');
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

function addAuthorsResearchRowsFunc() {
  connection.query(addAuthorsResearchRowsQuery, (error, results) => {
    if (error) {
      throw error;
    }
    console.log('Rows added');
  });
}

createResearchPapersTableFunc();
addAuthorRowsFun();
addResearchPapersRowsFunc();
createAuthorsResearchTableFunc();
alterAuthorsResearchTableAuthorFkFunc();
alterAuthorsResearchTablePaperFkFunc();
addAuthorsResearchRowsFunc();

connection.end(() => {
  console.log('Server disconnected!');
});
