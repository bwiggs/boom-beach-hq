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
        <td>
          {this.props.upgrade.level ?
              <span className="label label-info">{this.props.upgrade.level}</span>:
              <span className="label label-success">+</span>}
        </td>
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
