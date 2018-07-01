import 'babel-polyfill'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input } from 'antd';
import { Button, Icon } from 'antd';
import { DIRECTOR } from './common/config'
import { Modal } from 'antd'

class Reload extends Component {
    constructor() {
        super();
        this.state = { visible: false }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        this.props.reloadContent(this.props.room)
        this.props.resetMask(this.props.room)
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    render() {
        let element = null
        if (this.props.role == DIRECTOR) {
            element = <Button type="primary" icon="reload" onClick={this.showModal.bind(this)} className='upload' />
        }
        return (
            <div>
                {element}
                <Modal
                    title="Warning"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>You will refresh the content.</p>
                </Modal>
            </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        room: state.get('userConfig').room,
        role: state.get('userConfig').role
    }
}

export default connect(
    mapStateToProps
)(Reload)
