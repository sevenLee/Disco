import moment from 'moment'

export const sortingTable = (rows, sortCol, descending) => {
    rows.sort((a, b) => {
        let res = 0
        if (typeof a[sortCol] === 'number' && typeof b[sortCol] === 'number') {
            res = a[sortCol] - b[sortCol]
        } else {
            res = String(a[sortCol]).localeCompare(String(b[sortCol]))
        }
        return descending ? -1 * res : res
    })
    return rows
}

/**
 * Combine date and time fields, return the total timestamp of date and time fields
 * @param form {antd.form}
 * @param date {string}
 * @param time {string}
 * @returns {number}
 */
export const currentTimeFieldsToTimeValue = (form, date, time) => {
    const momentDate = form.getFieldValue(date)
    const momentTime = form.getFieldValue(time)
    const timeStamp = (momentTime.get('hour')*3600 + momentTime.get('minute')*60 + momentTime.get('second'))*1000
    const dateStamp = momentDate.valueOf()
    const totalStamp = dateStamp + timeStamp
    return totalStamp
}

export const getTimeValue = (timestamp) => {
    const timeMoment = moment(timestamp)
    const hour = timeMoment.get('hour')
    const minute = timeMoment.get('minute')
    const second = timeMoment.get('second')
    const timeValue = ((hour*3600 + minute*60 + second))*1000
    return timeValue
}

/**
 * According time type, transform timestamp to moment object for time field
 * e.g. Start Date, End Date, Start Time, End Time
 * @param timestamp
 * @param timeType
 * @returns {moment.Moment}
 */
export const getTimeValueToTimeFields = (timestamp, timeType) => {
    if(timeType === 'time') {
        return moment(timestamp)
    }

    const timeValue = getTimeValue(timestamp)
    const dateValue = timestamp - timeValue
    return moment(dateValue)
}

export const chooseTimeValue = (tempFormFields, location, initDateStartValue, fieldName) => {
    const timeType = fieldName.split('-')[1]
    const pickType = fieldName.split('-')[0]

    if(tempFormFields[fieldName]){
        return tempFormFields[fieldName]
    }else if(location.query[`${pickType}DateValue`]){
        return getTimeValueToTimeFields(location.query[`${pickType}DateValue`]*1, timeType)
    }else {
        return  initDateStartValue
    }
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y){
    // SameValue algorithm
    if (x === y) { // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        return x !== 0 || 1 / (x) === 1 / (y)
    } else {
        // Step 6.a: NaN == NaN
        return x !== x && y !== y
    }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 * http://stackoverflow.com/questions/22266826/how-can-i-do-a-shallow-comparison-of-the-properties-of-two-objects-with-javascri
 */
export const shallowEqual = (objA, objB) => {
    if (is(objA, objB)) {
        return true
    }

    if (typeof objA !== 'object' || objA === null ||
        typeof objB !== 'object' || objB === null) {
        return false
    }

    if(Array.isArray(objA) && Array.isArray(objB)){
        const theSameValueArray =  objA.filter((elm, index) => {
            if(typeof elm === 'object' && typeof objB[index] === 'object'){
                return shallowEqual(elm, objB[index])
            }else{
                return elm === objB[index]
            }
        })
        if(theSameValueArray.length !== objA.length){
            return false
        }
    }else{
        const keysA = Object.keys(objA)
        const keysB = Object.keys(objB)

        if (keysA.length !== keysB.length) {
            return false
        }

        for(let key in objA) {
            if(!(key in objB)) {
                return false
            }else if(typeof objA[key] === 'object'){
                return shallowEqual(objA[key], objB[key])
            }else if(objA[key] !== objB[key]){
                return false
            }
        }
        for(let key in objB) {
            if(!(key in objA)) {
                return false
            }else if(typeof objB[key] === 'object'){
                return shallowEqual(objA[key], objB[key])
            }else if(objA[key] !== objB[key]){
                return false
            }
        }
    }

    return true
}

export const hasDiffPropWithShallowEqual = (context, nextProps, checkNewProps) => {
    let hasDiffProp = false
    hasDiffProp = checkNewProps.some((prop) => {
        if(context.props[prop] !== undefined && nextProps[prop] !== undefined){
            const oldProp = context.props[prop]
            const newProp = nextProps[prop]
            if(!shallowEqual(oldProp, newProp)){
                /*eslint-disable no-console*/

                console.log(`...${prop} Not the same, oldVal is ${oldProp}, newVal is ${newProp} ----> Re-render Component...`)
                return true
            }else{
                /*eslint-disable no-console*/
                console.log(`...${prop} the same`)
            }
        }
    })
    return hasDiffProp
}

export const hasDiffStateWithShallowEqual = (context, nextState, checkNewStates) => {
    let hasDiffState = false
    hasDiffState = checkNewStates.some((state) => {
        if(context.state[state] !== undefined && nextState[state] !== undefined){
            const oldState = context.state[state]
            const newState = nextState[state]
            if(!shallowEqual(oldState, newState)){
                /*eslint-disable no-console*/

                console.log(`...${state} Not the same, oldVal is ${oldState}, newVal is ${newState} ----> Re-render Component...`)
                return true
            }else{
                /*eslint-disable no-console*/
                console.log(`...${state} the same`)
            }
        }
    })
    return hasDiffState
}

/**
 *
 * @param {object} formFieldsCollection
 * @param {string} hasRole
 */
export const outputCurrentFormFields = (formFieldsCollection, roleName) => {
    /*
    * formFieldsCollection:
    *
    * [
    *   {
    *       name: [fieldName]
    *       defaultValue: [defaultFormFieldValue],
    *       fieldValues: [tempFormFieldValue, queryParamFormFieldValue, initFormFieldValue],
    *       filterCallbacks: [tempFilter, queryParamFilter, initFilter]
    *   }
    * ]
    * */
    try {
        if (roleName) {
            const output = formFieldsCollection.reduce((result, field) => {
                let passIndex = null
                field.role[roleName].filterCallbacks.some((filterCallback, index) => {
                    if (filterCallback()) {
                        passIndex = index
                    }
                    return filterCallback()
                })

                result[field.name] = (passIndex !== null) ? {value: field.role[roleName].fieldValues[passIndex]} : {value: field.defaultValue}
                return result
            }, {})
            return output
        } else {
            const output = formFieldsCollection.reduce((result, field) => {
                let passIndex = null
                field.filterCallbacks.some((filterCallback, index) => {
                    if (filterCallback()) {
                        passIndex = index
                    }
                    return filterCallback()
                })

                result[field.name] = (passIndex !== null) ? {value: field.fieldValues[passIndex]} : {value: field.defaultValue}
                return result
            }, {})

            return output
        }
    } catch(e) {
        console.warn(e)
    }
}

export const handleFieldValuesChange = (props, fields) => {
    const { tempFormFields, location, saveTempFormFields, initDateValue } = props
    const newTempFormFields = Object.keys(fields).reduce((result, fieldName) => {
        if(['start-date', 'start-time', 'end-date', 'end-time'].filter(elm => fieldName === elm).length > 0){
            result[fieldName] = fields[fieldName].valueOf()
            if(fieldName === 'start-date') {
                const newStartDateValue = fields[fieldName].valueOf()
                const initDateStartValue = moment(initDateValue).startOf('day').valueOf()
                const oldTimeValue = chooseTimeValue(tempFormFields, location, initDateStartValue, 'start-time')
                const timeValue = getTimeValue(oldTimeValue)
                result[fieldName] = newStartDateValue
                result['start-time'] = newStartDateValue + timeValue
            }

            if(fieldName === 'end-date') {
                const newEndDateValue = fields[fieldName].valueOf()
                const oldTimeValue = chooseTimeValue(tempFormFields, location, initDateValue, 'end-time')
                const timeValue = getTimeValue(oldTimeValue)
                result[fieldName] = newEndDateValue
                result['end-time'] = newEndDateValue + timeValue
            }
        }else{
            result[fieldName] = fields[fieldName]
        }
        return result
    }, {})
    saveTempFormFields(newTempFormFields)
}
