import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

// selectors
import { getUserIdsSelector, isFetchingSelector } from '../redux/reducers/User'

// actions
import * as UserAction from '../redux/actions/User/action'

const action = {
    getUsers: UserAction.getUsers
}


// const pagination = { pageSize: 50, simple: true }
const pagination = false
const scroll = { y: '60vh' }


class RankingTableCT extends PureComponent {
    constructor(props) {
        super(props)
        console.log('-- constructor -- rankingRowsScope:')

    }

    componentDidMount() {
        //this.fetchData()
    }

    shouldComponentUpdate(){
        console.log('-- shouldComponentUpdate --')
        return true
    }

    fetchData() {
        //this.props.getRankings()
    }

    parseHash(hash){
        let oauthObj = {};
        const queryString = hash.substring(1);
        const regex = /([^#?&=]+)=([^&]*)/g;
        let match;

        while ((match = regex.exec(queryString)) !== null) {
            oauthObj[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
        }
        return oauthObj;
    }

    handleClick() {
        //const token = this.props.location.query.token
        const oauthObj = this.parseHash(this.props.location.hash)
        console.log('location:', location)
        console.log('oauthObj:', oauthObj)

        this.props.getUsers().then((v) => {
            console.log('vvvv:', v)
        })

        //this.props.getUsers({q: 'eshowshow', access_token: '4988264296.9f7d8bd.2d449d35ad7e44d191385f8d8e495989'})
    }

    render() {
        const { userIds, isFetching } = this.props
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
                <button onClick={() => this.handleClick()}>Get Users</button>
                {userIds &&
                    userIds.map((elm, index) => <div key={index}>{elm}</div>)
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('mapStateToProps state:', state)
    return {
        userIds: getUserIdsSelector(state),
        isFetching: isFetchingSelector(state),
    }
}

export default withRouter(connect(mapStateToProps, action)(RankingTableCT))