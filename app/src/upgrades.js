var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('bbhq.db');

var Upgrades = React.createClass({
  render: () => {
    return  <h1>Upgrades</h1>;
  }
});

db.each("select * from upgrades", (err, upgrades) => {
  console.log('render!');
  React.render(new Upgrades({upgrades: upgrades}), document.getElementById('main'));
});
