//var mtl21st = require("./mtl-21st.js");
//var firebaseDb = require("./firebaseDb.js").firebaseDb;
var moment = require('moment')

// Next monday if before Thursday, second next monday if Thursday
var date = moment().add(0, 'days')
if (date.day() < 4) {
  var menuDate = date.day(8)
} else {
  var menuDate = date.day(15)
}

var selectionStartDate = moment(menuDate).day(-10) // Second last Thursday
var selectionEndDate = moment(menuDate).day(-4) // Last Wednesday

console.log(menuDate.format('YYYY-MM-DD'))
console.log(selectionStartDate.format('YYYY-MM-DD'))
console.log(selectionEndDate.format('YYYY-MM-DD'))
