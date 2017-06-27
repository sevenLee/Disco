import React, {Component} from 'react'
import moment from 'moment'
import { hasDiffStateWithShallowEqual } from '../../helpers'


// props.endDate: <Moment>
class Countdown extends Component {
    constructor(props){
        super(props)
        this.state = {
            days: '00',
            hours: '00',
            min: '00',
            sec: '00'
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            const date = this.computeCountdown(this.props.endDate)
            date ? this.setState(date) : this.stop();
        }, 1000)
    }

    componentWillUnmount() {
        this.stop()
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('Countdown props:', this.props)
    //     console.log('Countdown nextProps:', nextProps)
    //     const checkNewState = [
    //         'days', 'hours', 'min', 'sec'
    //     ]
    //     // hasDiffStateWithShallowEqual
    //     if(hasDiffStateWithShallowEqual(this, nextState, checkNewState)){
    //         console.log('has last one state is diff --> Countdown update view')
    //         return true
    //     } else{
    //         console.log('in final return false ---> Countdown will not update')
    //         return false
    //     }
    // }

    formatTwoDigits(num) {
        return String(num).length < 2 ? '0' + num : '' + num
    }

    computeCountdown(endDate) {
        if(this.props.stopDate){
            const toStopDiff = this.props.stopDate.unix() - moment().unix()
            if(toStopDiff < 0) return false
        }

        const diff = endDate.unix() - moment().unix()
        const duration = moment.duration(diff * 1000, 'milliseconds')

        const years = duration.years()
        const days = duration.days()
        const hours = Math.floor(duration.hours())
        const min = duration.minutes()
        const sec = duration.seconds()

        return {
            days: days > 0 ? this.formatTwoDigits(days) : '00',
            hours: hours > 0 ? this.formatTwoDigits(hours) : '00',
            min: min > 0 ? this.formatTwoDigits(min) : '00',
            sec: sec > 0 ? this.formatTwoDigits(sec) : '00',
        }
    }

    stop() {
        clearInterval(this.interval)
    }

    render(){
        return (
            <h2 className="countdown">
                <b>{this.state.days}</b>
                <span>天</span>

                <b style={{marginLeft: 15}}>{this.state.hours}</b>
                <span>：</span>
                <b>{this.state.min}</b>
                <span>：</span>
                <b>{this.state.sec}</b>
            </h2>
        )
    }
}

export default Countdown
