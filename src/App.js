import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Radium from 'radium'
import * as actions from './actions'
import bind from 'lodash.bind'
import Matrix from './Matrix'
import ConfiWindow from './ConfigWindow'
import Data from './Data'
import Reload from './Reload'
import Display from './Display'

const styles = {
  row: {
    margin: '0px',
    padding: '0px',
    display: 'flex',
    flexFlow: 'row nowrap'
  }
}

class App extends Component {
  constructor(props) {
    super(props)

    this.updateMask = bind(this.updateMask, this)
    this.roleOnChange = bind(this.roleOnChange, this)
    this.roomOnChange = bind(this.roomOnChange, this)
    this.getContent = bind(this.getContent, this)
    this.getMask = bind(this.getMask, this)
    this.saveResource = bind(this.saveResource, this)
    this.reloadContent = bind(this.reloadContent, this)
    this.resetMask = bind(this.resetMask, this)
    this.enterRoom = bind(this.enterRoom, this)
    this.joinRequested = bind(this.joinRequested, this)
    this.teamOnChange = bind(this.teamOnChange, this)
    this.clickWrongBox = bind(this.clickWrongBox, this)
  }

  componentWillMount() {
    this.props.actions.startUp()
  }

  updateMask(room, mask) {
    this.props.actions.updateMask(room, mask)
  }

  getMask(room, role) {
    this.props.actions.getMask(room, role)
  }

  roleOnChange(e) {
    this.props.actions.setRole(e)
  }

  roomOnChange(e) {
    this.props.actions.addRoom(e)
  }

  teamOnChange(e) {
    this.props.actions.teamOnChange(e)
  }

  getContent(room) {
    this.props.actions.getContent(room)
  }

  saveResource(data) {
    this.props.actions.saveResource(data)
  }

  reloadContent(room) {
    this.props.actions.reloadContent(room)
  }

  resetMask(room) {
    this.props.actions.resetMask(room)
  }

  enterRoom(room, role, team) {
    this.props.actions.enterRoom(room, role, team)
  }

  joinRequested() {
    this.props.actions.joinRequested()
  }

  clickWrongBox(room, team) {
    this.props.actions.clickWrongBox(room, team)
  }

  render() {
    return (
      <div>
        <Display/>
        <ConfiWindow teamOnChange={this.teamOnChange} joinRequested={this.joinRequested} enterRoom={this.enterRoom} roleOnChange={this.roleOnChange} roomOnChange={this.roomOnChange} getContent={this.getContent} getMask={this.getMask} />
        <Matrix  clickWrongBox={this.clickWrongBox} updateMask={this.updateMask} />
        {/* <Data saveResource={this.saveResource} /> */}
        <Reload reloadContent={this.reloadContent} resetMask={this.resetMask} />
      </div >
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    actions: bindActionCreators(actions, dispatch)
  }
}

export default Radium(connect(
  null,
  mapDispatchToProps
)(App))
