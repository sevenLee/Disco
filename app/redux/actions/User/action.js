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


export const getUsers = (params) => (dispatch, getState) => {
    if(isFetchingSelector(getState())) {
        return Promise.resolve()
    }
    dispatch(fetchingUsers())
    let promise = apiService(dispatch, apiFactory.User.getUsers(), 'get', params)
        .then(res => {
            if(res) {
                /*eslint-disable no-console*/
                console.log('resres:', res)
                dispatch(fetchedUsers(res.data))
                return res
            }
        }).catch((err) => {
        console.log('err:', err)
            dispatch(fetchErrorUsers(err.message))
        })
    return promise
}



