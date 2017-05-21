import React, {PureComponent} from 'react'
import { Table } from 'antd'

// const RankingTable = ({ columns, dataSource, pagination, scroll, loading}) => (
//     <div>
//         <Table columns={columns} dataSource={dataSource} pagination={pagination} scroll={scroll}  />
//     </div>
// )


let columnsScope = [{
    title: '别名',
    dataIndex: 'userId',
    width: '60%',
}, {
    title: '排榜',
    dataIndex: 'rankingIndex'
}]



class RankingTable extends PureComponent {
    render(){
        console.log('*** Rerendering RankingTable *****')
        const { dataSource, pagination, scroll} = this.props

        return (
            <div>
                <Table columns={columnsScope} dataSource={dataSource} pagination={pagination} scroll={scroll}/>
            </div>
        )
    }
}

export default RankingTable
