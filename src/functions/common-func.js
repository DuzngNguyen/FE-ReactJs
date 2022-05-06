// import moment from 'moment'
import React from 'react'
export const EXPRESSTIME = 300;
export const getSession = function (sessionName) {
    let Value = JSON.parse(window.localStorage.getItem(sessionName))
    if (Value) {
        let expirationDate = new Date(Value.expirationDate)
        if (expirationDate > new Date()) {
            return Value
        } else {
            window.localStorage.removeItem(sessionName)
        }
    }
    return false
}

export const displayPrice = (price, currency) => {
    if (price) {
        price = Number(price)
        const currencies = {
            USD: ['$', 2, ',', 'before', 'United States dollar'],
            VND: ['₫', 0, '.', 'after', 'Vietnamese dong'],
        }
        const formatCurr = (xx, curr) => {
            if (!curr) curr = 'VND'
            let sym = currencies[curr][0]
            let dec = currencies[curr][1]

            let yy = Number(Math.round(xx + 'e' + dec) + 'e-' + dec)
            // let y = x.toFixed(dec);
            let zz = yy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, currencies[curr][2])
            return currencies[curr][3] === 'before' ? sym + zz : zz + sym
        }
        const formatPrice = () => {
            let rate = 1
            return formatCurr(price / rate, currency)
        }
        return formatPrice()
    }
    return 0
}

export const setSession = function (sessionName, sessionValue, expirationInMin) {
    let expirationDate = new Date(new Date().getTime() + EXPRESSTIME * expirationInMin)
    sessionValue.expirationDate = expirationDate.toISOString()
    localStorage.setItem(sessionName, JSON.stringify(sessionValue))
}

export const addSession = (sessionName, sessionValue) => {
    localStorage.setItem(sessionName, JSON.stringify(sessionValue))
}

export const removeSession = (sessionName) => {
    localStorage.removeItem(sessionName)
}

export const removeUserSession = () => {
    localStorage.clear()
}
