import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveIgName, getIgName, saveAct } from '../common/services/storage'
import { withRouter, browserHistory } from 'react-router'


// actions
import * as UserAction from '../redux/actions/User/action'



const action = {
    getUserSelfMedia: UserAction.getUserSelfMedia
}


class IgNameSearchCT extends Component {
    componentDidMount() {
        const location = this.props.location

        if(location.hash && getIgName()) {
            const act = location.hash.substring(14)
            saveAct(act)

            this.props.getUserSelfMedia(act)

        }

    }

    submitNewIgUser(e) {
        e.preventDefault();

        saveIgName(this.igNameInputDom.value)

        if (typeof window !== 'undefined') {
            window.location.href = "https://www.instagram.com/oauth/authorize/?client_id=9f7d8bdab0194595821d743a508b1239&redirect_uri=http://localhost:3000/&response_type=token&scope=public_content+follower_list+likes";
        }

        //window.location.href('https://www.instagram.com/oauth/authorize/?client_id=9f7d8bdab0194595821d743a508b1239&redirect_uri=http://localhost:3000/&response_type=token&scope=public_content+follower_list+likes')
        //browserHistory.push({pathname: 'https://www.instagram.com/oauth/authorize/?client_id=9f7d8bdab0194595821d743a508b1239&redirect_uri=http://localhost:3000/&response_type=token&scope=public_content+follower_list+likes'})

        //this.props.getActLocal(this.igNameInputDom.value)
        console.log('after gogog:')
        //if(key === '1') {
        //    this.props.getRankings()
        //}
    }

    render() {
        // console.log('***** Re- render *******');
        // console.log('***** Re-render this.state.dataSource *******:: ', this.state.dataSource);


        return (
            <form className="store-selector" onSubmit={(e) => this.submitNewIgUser(e)}>
                <input type="text" required
                       className="input-lg ig-name"
                       placeholder="輸入Ig 帳號"
                       ref={(inputDOM) => { this.igNameInputDom = inputDOM}} />
                <button type="submit" className="btn btn-info btn-lg">拿照片</button>
            </form>
        )
    }
}

export default withRouter(connect(null, action)(IgNameSearchCT))