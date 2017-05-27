import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { Tabs, Card, Icon, Input, Button, Checkbox, Select } from 'antd'
import moment from 'moment'

import BasePage from '../common/components/Layout/BasePage'
import RankingTabsCT from './RankingTabsCT'
import Countdown from '../common/components/Countdown/Countdown'

import logoImg from '../../assets/imgs/logo_word.png'

const cardStyle = {
    marginBottom: 30,
    minHeight: '500',
    boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px'
}


class Main extends Component {
    render() {
        /*
         https://www.instagram.com/oauth/authorize/?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URL}&response_type=token&scope=public_content+follower_list+likes

        * */

        return (
            <BasePage >
                <div className="promo-container">
                    <div className="promo-section">
                        <Row >
                            <Col xs={24} sm={24} lg={10} key="main">
                                <div className="p-lg">
                                    <div className="text-center top-title p-xl">
                                        <div className="brand-logo">
                                            <img src={logoImg} className="img-responsive"/>
                                        </div>
                                    </div>
                                    <div>
                                        <a className="btn btn-block btn-info btn-lg" href="https://api.instagram.com/oauth/authorize/?client_id=9f7d8bdab0194595821d743a508b1239&redirect_uri=http://www.discograms.com/&response_type=token">IG Login</a>
                                        <a className="btn btn-block btn-info btn-lg" href="https://api.instagram.com/oauth/authorize/?client_id=9f7d8bdab0194595821d743a508b1239&redirect_uri=http://www.discograms.com/&response_type=token&scope=public_content+follower_list+likes">IG 2 Login</a>
                                        <a className="mt-lg btn btn-block btn-primary btn-lg" >Fetch Data</a>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} lg={14} key="tabs">
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
            </BasePage>
        )
    }
}

export default Main
