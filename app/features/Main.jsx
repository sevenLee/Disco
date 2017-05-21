import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { Tabs, Card, Icon, Input, Button, Checkbox, Select } from 'antd'
import moment from 'moment'

import BasePage from '../common/components/Layout/BasePage'
import RankingTabsCT from './RankingTabsCT'
import Countdown from '../common/components/Countdown/Countdown'

import logoImg from '../../assets/imgs/logo.png'
import decoratorImg from '../../assets/imgs/frame.png'

const cardStyle = {
    marginBottom: 30,
    minHeight: '500',
    boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px'
}


class Main extends Component {
    render() {
        return (
            <BasePage >
                <div className="promo-container">
                    <div className="promo-section">
                        <Row >
                            <Col xs={24} sm={14} lg={14} key="main">
                                <div className="text-center top-title p-xl">
                                    <div className="brand-logo">
                                        <img src={logoImg} className="img-responsive"/>
                                    </div>
                                </div>
                                <div>

                                    <a className="btn btn-block btn-default" href="https://api.instagram.com/oauth/authorize/?client_id=9f7d8bdab0194595821d743a508b1239&redirect_uri=http://www.discograms.com/&response_type=token">Login</a>
                                </div>
                                <div className="brand-info clearfix">
                                    <div className="brand-info-part promo-title text-center">
                                        <h1>¥ 500,000</h1>
                                        <h2>人民币总奖金</h2>
                                        <h3 className="sub-white-text">额外 30 份幸运奖<br/>
                                        每份 5,000 人民币 等着幸运玩家赢取</h3>
                                    </div>
                                    <div className="brand-info-part time">
                                        <div className="duration sub-white-text">
                                            <h4>开始日</h4>
                                            <h3>01/03/2017 8 AM</h3>
                                            <h4>终了日</h4>
                                            <h3>28/12/2017 8 AM</h3>
                                        </div>
                                        <div className="timer">
                                            <h4>距离当天结束时间:</h4>
                                            <Countdown endDate={moment().endOf('day')} stopDate={moment().add(360, 's')} />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={10} lg={10} key="tabs">
                                <div className="m-lg" >
                                    <Card bordered={false}
                                          style={cardStyle}>
                                        <RankingTabsCT/>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="promo-decorator">
                    <img src={decoratorImg} className="img-responsive"/>
                </div>
            </BasePage>
        )
    }
}

export default Main
