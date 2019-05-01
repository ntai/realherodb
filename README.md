realherodb
======
Angular Tutorial RESTful database with PostgreSQL replacing in-memory database

### Angular Tutorial and Me
I was happily following the Angular Tutorial. And when it came to in-me mory-db part,
I ran into a problem. It just doesn't work. 

I googled a few things and it seems busted right now. This was my day 2 encounter with JavaScript, TypeScript and Angular.

So, I said - fine. I'll fake the fake db with real db. After a few more googling and trying and making mistakes, I finished the toy db access over HTTP. There is no security of any sorts so this is not a real world example. 

### Prerequisit and Preparation
I chose PostgreSQL as real database, and I used 10.7 from MacPorts. Make sure it supports Posix style string quote.

Install DB, and start DB. If this is a fresh start, you'd need a few steps to create database. For this, I created "testdb" using createdb.

Then, you need to create a table.

~~~~
/opt/local/lib/postgresql10/bin/psql testdb                                                                                                                                                                     
testdb=# create table hero ( id serial primary key, name varchar(100));
CREATE TABLE
~~~~

### Testing
Once you run the service, you can test it with curl or any web browser.

To almost match the Angular Tutorial, you can do so by running following curl commands. Unfortunately, I didn't bother to start the ID from 10 as in the tutorial, it starts from 1.

~~~~
curl -X POST http://localhost:3001/hero --data "name=Mr. Nice"
curl -X POST http://localhost:3001/hero --data "name=Narco"
curl -X POST http://localhost:3001/hero --data "name=Bombasto"
curl -X POST http://localhost:3001/hero --data "name=Celeritas"
curl -X POST http://localhost:3001/hero --data "name=Magneta"
curl -X POST http://localhost:3001/hero --data "name=RubberMan"
curl -X POST http://localhost:3001/hero --data "name=Dynama"
curl -X POST http://localhost:3001/hero --data "name=Dr IQ"
curl -X POST http://localhost:3001/hero --data "name=Magma"
curl -X POST http://localhost:3001/hero --data "name=Tornade"
~~~~
