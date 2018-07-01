import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'antd/dist/antd.css'
import { Modal, Button } from 'antd';
import { Radio } from 'antd';
import { InputNumber } from 'antd';
import { Row, Col } from 'antd';
import { Alert } from 'antd';
import * as config from './common/config'
const { DIRECTOR, PLAYER, RED, GREEN, YELLOW } = config

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


class ConfigWindow extends Component {

    constructor() {
        super();
    }

    componentWillMount() {
        this.setState({
            modalVisible: true,
            errorVisible: false,
            roomValue: 0,
            roleValue: PLAYER
        });
    }

    handleOk(e) {
        //we should generate new content in this action
        if (this.props.role !== null && this.props.room > -1) {
            this.setState({
                modalVisible: false,
            });
            this.props.getContent(this.props.room)
            this.props.getMask(this.props.room, this.props.role)
            this.props.enterRoom(this.props.room, this.props.role)
        } else {
            this.setState({ errorVisible: true })
        }
    }

    handleReset(e) {
        this.setState({
            ... this.state,
            roomValue: 0,
            roleValue: PLAYER
        })
    }

    handleRoleOnChange(e) {
        if (e.target.value != undefined) {
            this.setState({ roleValue: e.target.value })
            this.props.roleOnChange(e.target.value)
        }
    }

    handleRoomOnChange(e) {
        if (e != undefined && e > 0) {
            this.setState({ roomValue: e })
            this.props.roomOnChange(e)
        }
    }

    render() {
        return (<Modal
            title="Configuration"
            visible={this.state.modalVisible && !this.props.joined}
            onOk={this.handleOk.bind(this)}
            onCancel={this.handleReset.bind(this)}
            closable={false}
            cancelText={'Reset'}
        >
            {this.state.errorVisible ? (
                <div>
                    <Alert
                        message="Error"
                        description="please add room number and choose your role"
                        type="error"
                    />
                </div>
            ) : null}
            <div>
                <div>
                    <Row type="flex" justify="center">
                        <InputNumber placeholder="room number" min={0} max={9999999} onChange={this.handleRoomOnChange.bind(this)} value={this.state.roomValue} />
                    </Row>
                </div>
                <div style={{ marginTop: 16 }}>
                    <Row type="flex" justify="center">
                        <RadioGroup onChange={this.handleRoleOnChange.bind(this)} defaultValue={PLAYER} value={this.state.roleValue}>
                            <RadioButton value={DIRECTOR}>Director</RadioButton>
                            <RadioButton value={PLAYER}>Player</RadioButton>
                        </RadioGroup>
                    </Row>
                </div>
            </div>
        </Modal>)
    }
}

const mapStateToProps = (state) => {
    return {
        room: state.get('userConfig').room,
        role: state.get('userConfig').role,
        joined: state.get('userConfig').joined
    }
}

export default connect(
    mapStateToProps
)(ConfigWindow)