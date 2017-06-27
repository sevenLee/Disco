import React, {Component} from 'react';
import Countdown from '../common/components/Countdown/Countdown'
import moment from 'moment'

class CountdownCT extends Component {
    componentWillMount(){
        // console.log('>>> CountdownCT componentWillMount:')
    }

    componentDidMount(){
        // console.log('>>>! CountdownCT componentDidMount:')
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('CountdownCT props:', this.props)
        // console.log('CountdownCT nextProps:', nextProps)
        return false
    }

    componentWillReceiveProps(nextProps){
        // console.log('CountdownCT Receive props:', nextProps)

    }


    render() {
        // console.log('***Rerender CountdownCT')
        return (
            <Countdown endDate={moment('2017-07-25T16:00:00.000Z')} />
        )
    }
}

export default CountdownCT;