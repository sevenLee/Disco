import { combineReducers } from 'redux'
import { createSelector } from 'reselect'

const mediaObj = (state = null, action) => {
    switch (action.type) {
        case 'FETCHED_USER_SELF_MEDIA':
        {
            const nextState = {}
            /*eslint-disable no-console*/
            console.log('action.response:', action.response)
            action.response.forEach((media) => {
                nextState[media.id] = media
            })
            return nextState
        }
        default:
            return state;
    }
}

const mediaIds = (state = [], action) => {
    switch (action.type) {
        case 'FETCHED_USER_SELF_MEDIA':
        {
            return action.response.map(media => media.id)
        }
        default:
            return state;
    }
}

//const userName = (state = '', action) => {
//    switch(action.type) {
//        case 'INPUT_USER_NAME':
//        {
//            return action.name
//        }
//        default:
//            return state
//    }
//}

const isFetching = (state = false, action) => {
    switch (action.type) {
        case 'FETCHING_USER_SELF_MEDIA':
            return true
        case 'FETCHED_USER_SELF_MEDIA':
            return false
        case 'FETCH_ERROR__USER_SELF_MEDIA':
            return  false
        default:
            return state
    }
}

const media = combineReducers({
    mediaObj,
    mediaIds,
    isFetching
})

export default media

// state is global state
export const isFetchingSelector = (state) => {
    return state.media.isFetching
}

export const getMediaObjSelector = state => state.media.mediaObj
export const getMediaIdsSelector = state => state.media.mediaIds

export const getMediaImages = createSelector(
    [getMediaObjSelector, getMediaIdsSelector],
    (mediaObj, mediaIds) => {
        if(mediaObj === null) {
            return null
        }

        return mediaIds.map(id => {
            return mediaObj[id].images
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

