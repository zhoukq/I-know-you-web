import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'antd/dist/antd.css'
import { Modal, message } from 'antd'
import * as config from './common/config'
const { DIRECTOR, PLAYER } = config



class Matrix extends Component {
    static defaultProps = {
        content: [
            'test', 'test', 'test', 'test', 'test',
            'test', 'test', 'test', 'test', 'test',
            'test', 'test', 'test', 'test', 'test',
            'test', 'test', 'test', 'test', 'test'
        ]
    }

    constructor() {
        super();
        this.state = {
            visible: false,
            selectedKey: -1,
            selectedText: ""
        };
    }

    contentTransform(content) {
        return content.reduce((total, item, cur) => {
            let realIndex = total.length - 1 > 0 ? total.length - 1 : 0
            if (total[realIndex].length < 5) {
                total[realIndex].push(item)
                return total
            } else {
                total.push([])
                total[realIndex + 1].push(item)
                return total
            }
        }, [[]])
    }

    handleMask(role, text, num) {
        if (this.props.mask != undefined && this.props.mask.get(num) == false) {
            return role === DIRECTOR ? `selected ${text}` : text
        }
        return text
    }

    onBlankClick = (event) => {
        if (this.props.operable) {
            const key = event.target.getAttribute('id')
            const text = this.props.content[key].text;
            this.setState({
                visible: true,
                selectedKey: key,
                selectedText: text
            })
        }
    }

    successMessage() {
        message.success('nice choice');
    };

    errorMessage() {
        message.error('You choose a wrong answer, your screen will be frozen until your opponent makes a mistake', 5);
    };

    handleOpenMask = (e) => {
        if (this.props.mask != null) {
            const selected = this.state.selectedKey
            let mask = this.props.mask.map((v, i) => {
                return i == selected ? false : v
            })
            this.props.updateMask(this.props.room, mask)
            this.setState({ visible: false })
            //check if the answer is right
            if (this.props.content[selected].team != this.props.team) {
                this.errorMessage()
                this.props.clickWrongBox(this.props.room, this.props.team)
            } else {
                this.successMessage()
            }
        }
    }
    render() {
        return (
            <div className={this.props.operable ? 'calendar-body-box' : 'calendar-body-box freeze'}>
                <table id='calendarTable' className='calendar-table'>
                    {this.contentTransform(this.props.content).map((row, i) => {
                        return <tbody key={i}><tr>
                            {row.map((v, j) => {
                                let key = i * 5 + j;
                                if (this.props.mask.get(key) === false || this.props.role === DIRECTOR) {
                                    if (v.team === 'red') {
                                        return <td key={key} id={key} className={this.handleMask(this.props.role, 'red-team', key)}>{v.text}</td>
                                    } else if (v.team === 'green') {
                                        return <td key={key} id={key} className={this.handleMask(this.props.role, 'green-team', key)}>{v.text}</td>
                                    } else if (v.team === 'useless') {
                                        return <td key={key} id={key} className={this.handleMask(this.props.role, 'useless', key)}>{v.text}</td>
                                    } else {
                                        return <td key={key} id={key} className={this.handleMask(this.props.role, 'bomb', key)}>{v.text}</td>
                                    }
                                } else {
                                    return <td key={key} id={key} onClick={this.onBlankClick.bind(this)}>{v.text}</td>
                                }
                            })}
                        </tr></tbody>
                    }
                    )}

                </table>
                <Modal title='Open' visible={this.state.visible}
                    onOk={this.handleOpenMask.bind(this)} onCancel={e => { this.setState({ visible: false }) }}>
                    <p>Are you sure to choose {this.state.selectedText}?</p>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        content: state.get('userConfig').content,
        role: state.get('userConfig').role,
        room: state.get('userConfig').room,
        mask: state.get('userConfig').mask,
        team: state.get('userConfig').team,
        operable: state.get('userConfig').operable

    }
}

export default connect(
    mapStateToProps
)(Matrix)