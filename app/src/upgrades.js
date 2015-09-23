
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('bbhq.db');

class Upgrades extends React.Component {
  render() {
    return  <h1>Upgrades</h1>;
  }
}

class Upgrade extends React.Component {
  render() {
    return  <p>Upgrades</p>;
  }
}

// export default MyComponent;

db.each("select * from upgrades", (err, upgrade) => {
  console.log(upgrade);
  // React.render(<Upgrades />, document.body);
});
