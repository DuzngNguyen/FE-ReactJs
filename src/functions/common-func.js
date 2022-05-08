export const EXPRESSTIME = 300;

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
            if (currency === 'USD') {
                let exChangeRate = getExChangeRateSession()
                rate = exChangeRate['transfer']
            }
            return formatCurr(price / rate, currency)
        }
        return formatPrice()
    }
    return 0
}

export const getExChangeRateSession = () => {
    const changerate = window.localStorage.getItem('exchange_rate')
    return changerate ? JSON.parse(changerate) : null
}

export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    console.log('=============== userStr: ', userStr);
    if (userStr && userStr !== 'undefined') {
        console.log('----------- OK');
        return JSON.parse(userStr);
    }
    return null;
}

// return the token from the session storage
export const getToken = () => {
    return sessionStorage.getItem('token') || null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
}

// set the token and user from the session storage
export const setUserSession = (token, user) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
}
