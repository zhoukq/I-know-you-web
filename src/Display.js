import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'antd/dist/antd.css'
import { Row, Col } from 'antd'

class Display extends Component {

    constructor() {
        super();
    }


    render() {
        return (
            <div className='display'>
                <Row type="flex" justify="center">
                    <Col span={8}>Room : {this.props.room} </Col>
                    <Col span={8}>Role : {this.props.role} </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={8}>Team : {this.props.team} </Col>
                    <Col span={8}>Status : {this.props.operable ? 'unfrozen' : 'frozen'} </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        room: state.get('userConfig').room,
        role: state.get('userConfig').role,
        team: state.get('userConfig').team,
        operable: state.get('userConfig').operable
    }
}

export default connect(
    mapStateToProps
)(Display)