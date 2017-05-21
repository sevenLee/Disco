import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Tabs } from 'antd'

import RankingTableCT from './RankingTableCT'
import Rule from './Rule'
import AwardTable from './AwardTable'

// actions
import * as RankingsAction from '../redux/actions/Rankings/action'

const TabPane = Tabs.TabPane


const action = {
    getRankings: RankingsAction.getRankings
}


class RankingTabsCT extends PureComponent {

    handleTabsChange(key) {
        console.log('key:', key)
        if(key === '1') {
            this.props.getRankings()
        }
    }

    render() {
        // console.log('***** Re- render *******');
        // console.log('***** Re-render this.state.dataSource *******:: ', this.state.dataSource);


        return (
            <Tabs onChange={(key) => this.handleTabsChange(key)}>
                <TabPane tab="擂台排行榜" key="1">
                    <RankingTableCT />
                </TabPane>
                <TabPane tab="擂台规则" key="2">
                    <Rule />
                </TabPane>
                <TabPane tab="派彩" key="3">
                    <AwardTable />
                </TabPane>
            </Tabs>
        )
    }
}

export default connect(null, action)(RankingTabsCT)