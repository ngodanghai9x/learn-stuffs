CREATE TABLE newtable LIKE oldtable; 
INSERT INTO newtable SELECT * FROM oldtable WHERE 1=1;