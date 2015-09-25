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
          <th><img src="dist/images/level.png" width="24" /></th>
          <th><img src="dist/images/exp.png" width="24" /></th>
          <th>Exp/Hour</th>
          <th><img src="dist/images/hq.png" width="24" /></th>
          <th><img src="dist/images/gold.png" width="24" /></th>
          <th><img src="dist/images/wood.png" width="24" /></th>
          <th><img src="dist/images/stone.png" width="24" /></th>
          <th><img src="dist/images/iron.png" width="24" /></th>
          <th><img src="dist/images/stopwatch.png" width="24" /></th>
          <th>Upgrade</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
      </table>;
  }
}
