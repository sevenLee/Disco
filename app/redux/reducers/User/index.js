import { combineReducers } from 'redux'
//import { createSelector } from 'reselect'

const users = (state = null, action) => {
    switch (action.type) {
        case 'FETCHED_USERS':
        {
            const nextState = {}
            action.response.forEach((user) => {
                nextState[user.id] = user
            })
            return nextState
        }
        default:
            return state;
    }
}

const userIds = (state = [], action) => {
    switch (action.type) {
        case 'FETCHED_USERS':
        {
            return action.response.map(user => user.id)
        }
        default:
            return state;
    }
}

const isFetching = (state = false, action) => {
    switch (action.type) {
        case 'FETCHING_USERS':
            return true
        case 'FETCHED_USERS':
            return false
        case 'FETCH_ERROR_USERS':
            return  false
        default:
            return state
    }
}

const user = combineReducers({
    users,
    userIds,
    isFetching
})

export default user

// state is global state
export const isFetchingSelector = (state) => {
    return state.user.isFetching
}

export const getUsersSelector = state => state.user.users

//export const getRankingRows = createSelector(
//    getAllRankings,
//    (all) => {
//        if(all === null) {
//            return null
//        }
//
//        return Object.keys(all).map(id => {
//            return all[id]
//        })
//    }
//)

// export const getRankingRows = (state) => {
//     if(state.rankings.all === null) {
//         return null
//     }
//
//
//     const rankingRows =  Object.keys(state.rankings.all).map(id => {
//         return state.rankings.all[id]
//     })
//
//     /*eslint-disable no-console*/
//     console.log('rankingRows:', rankingRows)
//
//     return rankingRows
// }

