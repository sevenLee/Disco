import * as apiFactory from '../../../apis';
import apiService from '../../../common/services/apiService'
import { isFetchingSelector } from '../../reducers/Rankings'
import { MOCK_HOST } from '../../../../config/global'


const fetchingRankings = () => ({
    type: 'FETCHING_RANKINGS'
})

const fetchedRankings = (response, searchPathParams) => ({
    type: 'FETCHED_RANKINGS',
    response,
    searchPathParams
});

const fetchErrorRankings = (error) => ({
    type: 'FETCH_ERROR_RANKINGS',
    error
})


export const getRankings = (params, searchPathParams) => (dispatch, getState) => {
    if(isFetchingSelector(getState())) {
        return Promise.resolve()
    }
    dispatch(fetchingRankings())
    let promise = apiService(dispatch, apiFactory.Rankings.getRankings(), 'get', params, MOCK_HOST)
        .then(res => {
            if(res) {
                /*eslint-disable no-console*/
                console.log('resres:', res)
                dispatch(fetchedRankings(res.data, searchPathParams))
                return res
            }
        }).catch((err) => {
        console.log('err:', err)
            dispatch(fetchErrorRankings(err.message))
        })
    return promise
}



