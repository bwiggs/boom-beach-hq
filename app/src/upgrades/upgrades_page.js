class UpgradesPage extends React.Component {

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

React.render(<UpgradesPage />, document.getElementById('main'));


