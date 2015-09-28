class Icon extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return  <span className="glyphicon glyphicon-{this.props.icon}"></span>;
  }
}
