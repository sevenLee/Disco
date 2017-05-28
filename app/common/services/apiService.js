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

    const finalHeaders = Object.assign({}, {
        'content-type': 'text/plain',
        'Accept': 'application/json'
    }, nextHeaders)
    let finalConfig = {
        headers: finalHeaders,
        //cache: 'no-store',
        mode: 'cors',
        method,
        body
    }
    finalConfig = Object.assign({}, finalConfig, config)

    return new Promise((resolve, reject)=> {
        let requestPromise = Promise.race([
            fetch(`${host}/${endpoint}`, finalConfig),
            new Promise(function (resolve, reject) {
                setTimeout(() => reject(new Error('request timeout')), REQUEST_TIMEOUT)
            })
        ])

        requestPromise
            .then(function(response) {
                let resolveDataPromise
                console.log('@@response:', response)

                if (response.type === 'opaque') {
                        console.log('opaqueopaqueopaque')
                        return Promise.reject()

                } else {
                    console.log('GooooooooGod')

                    // do something else
                    if(file === 'csv'){
                        resolveDataPromise =  response.text()
                    } else{
                        resolveDataPromise =  response.json()
                    }

                    return resolveDataPromise.then(responsePayloadData => {
                        console.log('GooooooooGod22')

                        resolve({
                            responsePayloadData,
                            response
                        })
                    })
                }
            })
            .then(

                function(fromStep1Value){

                    debugger

                    if(!fromStep1Value) {
                        return Promise.resolve(reject())
                    }


                    /*eslint-disable no-process-env*/
                    if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'localdev') {
                        /*eslint-disable no-console*/
                        console.log('response:', fromStep1Value.response)
                        console.log('responsePayloadData:', fromStep1Value.responsePayloadData)
                    }

                    if (!fromStep1Value.response.ok) {
                        if(fromStep1Value.response.status === 401 || fromStep1Value.response.status === 403){
                            console.warn('response.status')
                        }
                        reject(fromStep1Value.responsePayloadData);
                    }
                    return fromStep1Value.responsePayloadData;
                }
            )
            .then(
                response => {
                    if(!response) {
                        return Promise.resolve(reject())
                    }

                    let resp = typeof response === 'string' ? JSON.parse(response) : response;
                    //console.log(resp);
                    resolve(resp); //这个resp会被外部接收

                    //resolve(response)
                }
            )
            .catch((err) => {
                console.log('in fetch catch:', err)
                return Promise.resolve(reject(err))
            })
    })
}

export default apiService