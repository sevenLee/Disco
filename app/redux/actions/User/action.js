import * as apiFactory from '../../../apis';
import apiService from '../../../common/services/apiService'
import { isFetchingSelector } from '../../reducers/User'
//import { MOCK_HOST } from '../../../../config/global'


const fetchingUsers = () => ({
    type: 'FETCHING_USERS'
})

const fetchedUsers = (response) => ({
    type: 'FETCHED_USERS',
    response
});

const fetchErrorUsers = (error) => ({
    type: 'FETCH_ERROR_USERS',
    error
})

const fetchingUserSelfMedia = () => ({
    type: 'FETCHING_USER_SELF_MEDIA'
})

const fetchedUserSelfMedia = (response) => ({
    type: 'FETCHED_USER_SELF_MEDIA',
    response
})

const fetchErrorUserSelfMedia = (error) => ({
    type: 'FETCH_ERROR__USER_SELF_MEDIA',
    error
})



export const getUsers = () => (dispatch, getState) => {
    if(isFetchingSelector(getState())) {
        return Promise.resolve()
    }
    dispatch(fetchingUsers())
    return apiService(dispatch, apiFactory.User.getUsers(), 'get')
        .then(res => {
            if(res) {
                /*eslint-disable no-console*/
                console.log('resres:', res)
                dispatch(fetchedUsers(res.data))
                return Promise.resolve(res.data)
            }
        }).catch((err) => {
            console.log('last err:', err)
            let errorMsg = ''
            if(err) {
                errorMsg = err.message
            }else{
                errorMsg = 'Something Error'
            }

            dispatch(fetchErrorUsers(errorMsg))

        })
}

export const getUserSelfMedia = (act) => (dispatch, getState) => {
    if(isFetchingSelector(getState())) {
        return Promise.resolve()
    }
    dispatch(fetchingUserSelfMedia())

    return apiService(dispatch, apiFactory.User.getUserSelfMedia(), 'get', {accessToken: act})
        .then(res => {
            if(res) {
                /*eslint-disable no-console*/
                console.log('resres:', res)
                dispatch(fetchedUserSelfMedia(res.data))
                //return Promise.resolve(res.data)
            }
        }).catch((err) => {
            console.log('last err:', err)
            let errorMsg = ''
            if(err) {
                errorMsg = err.message
            }else{
                errorMsg = 'Something Error'
            }

            dispatch(fetchErrorUserSelfMedia(errorMsg))

        })
}



