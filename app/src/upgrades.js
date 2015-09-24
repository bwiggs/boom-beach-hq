
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('bbhq.db');

class Upgrades extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.loadUpgrades();
  }

  loadUpgrades() {
    db.all("select * from upgrades", (err, upgrades) => {
      this.setState({upgrades: upgrades})
    });
  }

  render() {
    if(!this.state.upgrades) return null

    return  <div>
      <h1>Upgrades</h1>
      <UpgradesTable upgrades={this.state.upgrades} />
    </div>;
  }
}

class UpgradesTable extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var rows = this.props.upgrades.map((upgrade) => {
      return <UpgradeRow upgrade={upgrade} key={upgrade.id}/>
    })

    return  <table>
      <tr>
        <th>Name</th>
        <th>Level</th>
        <th>Experience</th>
        <th>Exp/Hour</th>
        <th>Required HQ</th>
        <th>Gold</th>
        <th>Wood</th>
        <th>Stone</th>
        <th>Iron</th>
        <th>Time</th>
      </tr>
      {rows}
      </table>;
  }
}

class UpgradeRow extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return  <tr>
        <td>{this.props.upgrade.name}</td>
        <td>{this.props.upgrade.level}</td>
        <td>{this.props.upgrade.experience}</td>
        <td>{this.props.upgrade.exp_per_hour}</td>
        <td>{this.props.upgrade.required_hq}</td>
        <td>{this.props.upgrade.gold}</td>
        <td>{this.props.upgrade.wood}</td>
        <td>{this.props.upgrade.stone}</td>
        <td>{this.props.upgrade.iron}</td>
        <td>{this.props.upgrade['time'] / 60}</td>
      </tr>;
  }

}

React.render(<Upgrades />, document.getElementById('main'));

// class Upgrade extends React.Component {
//   render() {
//     return  <p>Upgrades</p>;
//   }
// }


