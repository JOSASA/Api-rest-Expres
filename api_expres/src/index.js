const express = require('express');
const app = express();
const morgan = require('morgan');
var cors = require('cors')

var bodyParser = require("body-parser");

var whitelist = ["http://localhost:8080", "http://127.0.0.1"];

var corsOptions = {
    origin: function (origin, callback) {
      callback(null, true);
      return;
      console.log(origin);
      if (whitelist.indexOf(origin) !== -1) {
        console.log("Origin allowed");
        callback(null, true);
      } else {
        console.error("Origin not allowed");
        callback(new Error("Not allowed by CORS"));
      }
    },
  };


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use( cors( corsOptions )  );
// serttings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use(require('./routes/index'));
app.use('/api/clientes',require('./routes/clientes'));
app.use('/api/citas',require('./routes/citas'));
app.use('/api/refacciones',require('./routes/refacciones'));
app.use('/api/vehiculos',require('./routes/vehiculos'));

//starting server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})