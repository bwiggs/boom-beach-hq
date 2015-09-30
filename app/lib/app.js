import React from 'react'
import Sidebar from 'sidebar'
import MainContainer from 'main-container'

export default class App extends React.Component {
  render() {
    return  <div>
      <Sidebar />
      <MainContainer />
    </div>;
  }
}
