
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('bbhq.db');

class Upgrades extends React.Component {

  constructor(props) {
    super(props)
    var self = this;
    this.state = {
      hqLevel: 1
    }

    db.get(`select * from user_buildings ub join building_levels bl on bl.id = ub.building_level_id where name = "Headquarters"`, (err, hq) => {
      self.setState({hqLevel: hq.level})
      this.reloadUpgrades();
    });
  }

  reloadUpgrades(hqLevel) {
    if(!hqLevel) hqLevel = this.state.hqLevel
    db.all("select * from upgrades where required_hq <= " + hqLevel, (err, upgrades) => {
      this.setState({upgrades: upgrades})
    });
  }

  hqLevelChange (evt) {
    var newHqLevel = evt.target.value;
    this.reloadUpgrades(newHqLevel);
    this.setState({hqLevel: newHqLevel});
  }

  render() {

    if(!this.state.upgrades) return null

    return  <div>
      <h1>Upgrades</h1>
      <label>HQ Level {this.state.hqLevel}</label>
      <input type="range" min="1" max="20" value={this.state.hqLevel} onChange={this.hqLevelChange.bind(this)} />
      <UpgradesTable upgrades={this.state.upgrades} reloadUpgrades={this.reloadUpgrades.bind(this)}/>
    </div>;
  }
}

class UpgradesTable extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var rows = this.props.upgrades.map((upgrade) => {
      return <UpgradeRow upgrade={upgrade} key={upgrade.id} reloadUpgrades={this.props.reloadUpgrades}/>
    })

    return  <table className="table table-striped ">
      <thead>
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
          <th>Upgrade</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
      </table>;
  }
}

class UpgradeRow extends React.Component {

  constructor(props) {
    super(props)
  }

  handleUpgrade(upgrade, dir) {
    if(dir < 0 && !upgrade.prev_building_level_id) return;
    var self = this
    db.all(`select * from building_levels where id = ${dir > 0 ? upgrade.building_level_id : upgrade.prev_building_level_id}`, (err, levels) => {
      if(levels.length == 0) return;
      db.run(`update user_buildings set building_level_id = ${levels[0].id} where id = ${upgrade.user_building_id}`, (err, res) => {
        self.props.reloadUpgrades();
      });
    })
  }

  render() {
    return  <tr>
        <td>{this.props.upgrade.name}</td>
        <td>{this.props.upgrade.level ? <span className="label label-info">{this.props.upgrade.level}</span> : <span className="label label-success">NEW</span>}</td>
        <td>{this.props.upgrade.experience}</td>
        <td>{this.props.upgrade.exp_per_hour}</td>
        <td>{this.props.upgrade.required_hq}</td>
        <td>{this.props.upgrade.gold}</td>
        <td>{this.props.upgrade.wood}</td>
        <td>{this.props.upgrade.stone}</td>
        <td>{this.props.upgrade.iron}</td>
        <td>{this.props.upgrade['time'] / 60}</td>
        <td>
          <div className="btn-group">
            <span className="btn btn-default" onClick={this.handleUpgrade.bind(this, this.props.upgrade, 1)}>Up</span>
            <span className="btn btn-default" onClick={this.handleUpgrade.bind(this, this.props.upgrade, -1)}>Down</span>
          </div>
        </td>
      </tr>;
  }

}

React.render(<Upgrades />, document.getElementById('main'));

// class Upgrade extends React.Component {
//   render() {
//     return  <p>Upgrades</p>;
//   }
// }


