class UpgradesTable extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var rows = this.props.upgrades.map((upgrade) => {
      return <UpgradeRow upgrade={upgrade} key={upgrade.id} reloadUpgrades={this.props.reloadUpgrades}/>
    })

    return  <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th><img alt="Next Level" src="dist/images/level.png" width="24" /></th>
          <th><img alt="Required HQ Level" src="dist/images/hq.png" width="24" /></th>
          <th><img alt="Gold" src="dist/images/gold.png" width="24" /></th>
          <th><img alt="Wood" src="dist/images/wood.png" width="24" /></th>
          <th><img alt="Stone" src="dist/images/stone.png" width="24" /></th>
          <th><img alt="Iron" src="dist/images/iron.png" width="24" /></th>
          <th><img alt="Time" src="dist/images/stopwatch.png" width="24" /></th>
          <th><img alt="Experience" src="dist/images/exp.png" width="24" /></th>
          <th>Exp/Hour</th>
          <th>Upgrade</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
      </table>;
  }
}
