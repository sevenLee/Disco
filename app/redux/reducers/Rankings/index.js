import { combineReducers } from 'redux'
import { createSelector } from 'reselect'

const all = (state = null, action) => {
    switch (action.type) {
        case 'FETCHED_RANKINGS':
        {
            const nextState = {}
            action.response.payload.forEach((ranking) => {
                nextState[ranking.id] = ranking
            })
            return nextState
        }
        default:
            return state;
    }
}

const isFetching = (state = false, action) => {
    switch (action.type) {
        case 'FETCHING_RANKINGS':
            return true
        case 'FETCHED_RANKINGS':
            return false
        case 'FETCH_ERROR_RANKINGS':
            return  false
        default:
            return state
    }
}

const rankings = combineReducers({
    all,
    isFetching
})

export default rankings

// state is global state
export const isFetchingSelector = (state) => {
    return state.rankings.isFetching
}

const getAllRankings = state => state.rankings.all

export const getRankingRows = createSelector(
    getAllRankings,
    (all) => {
        if(all === null) {
            return null
        }

        return Object.keys(all).map(id => {
            return all[id]
        })
    }
)

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

