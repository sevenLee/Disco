import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import RankingTable from '../common/components/RankingTable/RankingTable'

// selectors
import { getRankingRows, isFetchingSelector } from '../redux/reducers/Rankings'

// actions
import * as RankingsAction from '../redux/actions/Rankings/action'

const action = {
    getRankings: RankingsAction.getRankings
}

let columnsScope = [{
    title: '别名',
    dataIndex: 'userId',
    width: '60%',
}, {
    title: '排榜',
    dataIndex: 'rankingIndex'
}]
// const pagination = { pageSize: 50, simple: true }
const pagination = false
const scroll = { y: '60vh' }


class RankingTableCT extends PureComponent {
    constructor(props) {
        super(props)
        console.log('-- constructor -- rankingRowsScope:')

    }

    componentDidMount() {
        this.fetchData()
    }

    shouldComponentUpdate(){
        console.log('-- shouldComponentUpdate --')
        return true
    }

    fetchData() {
        this.props.getRankings()
    }

    render() {
        const { rankingRows, isFetching } = this.props
        console.log('***** Re-render RankingTableCT*******');



        // console.log('userId:', rowsMap.getIn(['data', 0, 'userId']))


        // var dataList = {id: 1}
        // var rowsMap = fromJS({})
        // var rowMap = Map({
        //     userId: "51529827",
        //     id: "4ba2db8d-a041-42af-ab4c-965e83e63c4a",
        //     rankingIndex: 3
        // })
        //
        // const ffMap = rowsMap.set('data', rowMap)

        // rowsMap.push(rowMap)
        // var AA = ffMap.toJS();
        // console.log('AAA:', AA)
        //
        // console.log('final rowsMap:', rowsMap)



        // const datas = fromJS(rankingRows)

        return (
            <div>
                <RankingTable
                    dataSource={rankingRows}
                    scroll={scroll}
                    pagination={pagination}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('mapStateToProps state:', state)
    return {
        rankingRows: getRankingRows(state),
        isFetching: isFetchingSelector(state),
    }
}

export default connect(mapStateToProps, action)(RankingTableCT)