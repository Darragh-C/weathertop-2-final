"use strict";

const express = require("express");
const logger = require("./utils/logger");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const exphbs = require("express-handlebars");
const path = require('node:path');


const app = express();
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(fileUpload());
app.use("/images", express.static(path.join(__dirname, "/public/images")));

const hbs = exphbs.create({
  extname: ".hbs",
  defaultLayout: "main",

  //helpers
  helpers: {
    ifEq: function(variable, value, options){
      //variable = station.tempTrend
      //value = 1 or -1
      if (variable == value) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    }
  },
})

app.engine(".hbs", hbs.engine);

app.set("view engine", ".hbs");

const routes = require("./routes");
app.use("/", routes);

const listener = app.listen(process.env.PORT || 4001, function() {
  logger.info(`weathertop-2-release-4 started on port ${listener.address().port}`);
});
