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

  getFormattedTime () {
    let minutes = this.props.upgrade.time;
    if(minutes == 0) {
      return `instant`
    } else if(minutes < 60) {
      return `${minutes}m`
    } else if(minutes < 24*60) {
      let hours = minutes / 60;
      return `${hours}h`
    } else {
      let days = minutes / 60 / 24
      return `${days}d`
    }
  }

  getResource(res) {
    let resources = this.props.upgrade[res]
    if(resources > 0) {
      resources = resources.toLocaleString();
    }
    return resources;
  }

  render() {
    return  <tr>
        <td>{this.props.upgrade.name}</td>
        <td>
          {this.props.upgrade.level ?
              <span className="label label-info">{this.props.upgrade.level}</span>:
              <span className="label label-success">+</span>}
        </td>
        <td>{this.props.upgrade.required_hq}</td>
        <td>{this.getResource('gold')}</td>
        <td>{this.getResource('wood')}</td>
        <td>{this.getResource('stone')}</td>
        <td>{this.getResource('iron')}</td>
        <td>{this.getFormattedTime()}</td>
        <td>{this.props.upgrade.experience}</td>
        <td>{this.props.upgrade.exp_per_hour}</td>
        <td>
          <div className="btn-group">
            <span className="btn btn-default" onClick={this.handleUpgrade.bind(this, this.props.upgrade, 1)}>Up</span>
            <span className="btn btn-default" onClick={this.handleUpgrade.bind(this, this.props.upgrade, -1)}>Down</span>
          </div>
        </td>
      </tr>;
  }
}
