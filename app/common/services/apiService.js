import { API_HOST, REQUEST_TIMEOUT } from '../../../config/global'
import { getAct } from './storage'
import 'whatwg-fetch';

const getQueryString = (params) => {
    var esc = encodeURIComponent;
    return Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
}

/**
 * apiService
 * @param endpoint {string}
 * @param method {string}
 * @param params {object}
 * @param host {string}
 * @param config {object}
 * @param file {string}
 * @returns {Promise}
 */
const apiService = (dispatch, endpoint, method = 'get', params, host = API_HOST, config, file) => {
    /*eslint-disable no-debugger*/


    let body;

    if(host === null) {
        host = API_HOST
    }

    if(['get', 'delete'].indexOf(method) > -1 && params){
        endpoint = endpoint + '?' + getQueryString(params)
    }
    if(['post', 'put'].indexOf(method) > -1 && params){
        body = JSON.stringify(params)
    }

    let nextHeaders = {}
    /**
     *  For easy to use authenticated
     *
     *  config = { authenticated: true }
     *
     *  it will set request header with Authorization: 'Bearer ' + accessToken, accessToken is from session storage
     */
    try{
        if(config) {
            const authenticated = config['authenticated']
            if (authenticated) {
                nextHeaders = Object.assign({}, {'Authorization': 'Bearer ' + getAct()})
            }
        }
    }catch(e) {
        /* eslint-disable no-console */
        console.log(e)
    }

    try{
        if(file === 'csv'){
            nextHeaders = Object.assign({}, nextHeaders, {'Accept': 'text/csv'})
        }
    }catch(e) {
        /* eslint-disable no-console */
        console.log(e)
    }

    const finalHeaders = Object.assign({}, {'content-type': 'application/json'}, nextHeaders)
    let finalConfig = {
        headers: finalHeaders,
        cache: 'no-store',
        mode: 'no-cors',
        method,
        body
    }
    finalConfig = Object.assign({}, finalConfig, config)

    return new Promise((resolve,reject)=> {
        let requestPromise = Promise.race([
            fetch(`${host}/${endpoint}`, finalConfig),
            new Promise(function (resolve, reject) {
                setTimeout(() => reject(new Error('request timeout')), REQUEST_TIMEOUT)
            })
        ])

        requestPromise
            .then(response => {
                let resolveDataPromise
                if(file === 'csv'){
                    resolveDataPromise =  response.text()
                } else{
                    resolveDataPromise =  response.json()
                }

                return resolveDataPromise.then(responsePayloadData => ({responsePayloadData, response}))
            })
            .then(({ responsePayloadData, response }) => {
                /*eslint-disable no-process-env*/
                if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'localdev') {
                    /*eslint-disable no-console*/
                    console.log('response:', response)
                    console.log('responsePayloadData:', responsePayloadData)
                }

                if (!response.ok) {
                    if(response.status === 401 || response.status === 403){
                        console.warn('response.status')
                    }
                    return Promise.reject(responsePayloadData);
                }
                return responsePayloadData;
            })
            .then(
                response => {
                    resolve(response)
                }
            )
            .catch((err) => {
                console.log('in fetch catch:', err)
                reject(err)
            })
    })
}

export default apiService