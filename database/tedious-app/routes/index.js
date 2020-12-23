const express = require('express');
const tedious = require('tedious');

const router = express.Router();
const Request = tedious.Request;
const TYPES = tedious.TYPES;

const dbConnect = require('../data/db/connect'); 

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/test-sql', async (req, res, next) => {
  res.type('application/xml');
  
  try {
    const connection = await dbConnect();
    var totalRows;
    request = new Request('SELECT * FROM contacts', function(err, rowCount, rows) {
      if (err) {
        console.log(err);
      } else {
        totalRows = rowCount;
        console.log('Row count', rowCount);
        console.log(typeof rows);
        console.log(rows);
        //res.send(`Row count: ${rowCount}`);
      }
    });

    let counter = 0;
    let table = `<table>
                  <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                  </tr>`;
    request.on('row', function(columns, x) {
      console.log('X is ', x);
      counter++;
      table += '<tr>';
      columns.forEach(column => {
        table += `<td>${column.value}</td>`;
        console.log(column.value);
      });
      table += '</tr>';
      console.log('End column');
      console.log('counter', counter);
      console.log('totalCount', totalRows);
      if (counter == 2) {
        table += '</table>'
        res.end(table);
      }
      console.log('Row');
    });

    request.on('done', function (rowCount, more, rows) { 
      console.log('Done');
    });
    connection.execSql(request);
  } catch(err) {
    console.log('Catch Error: ', err);
    next(err)
  }
});

router.get('/stored-proc', async (req, res) => {
 try 
 {  
    const connection = await dbConnect();
    const request = new Request('Get_Contacts', (err, rowCount, rows) => {
        if (err) {
          console.log(err);
        }
    });

    request.addParameter('email', TYPES.VarChar, 'chi@hotmail.co');
    let row = "<tr>";
    request.on('row', columns => {
        columns.forEach(column => {
          console.log(column.value);
          row += `<td>${column.value}</td>`;
        })
        row += "</tr>";
        res.end(row);
    });
    
    connection.callProcedure(request);
  } catch(err) {
    console.log(err);
  }
});

module.exports = router;
