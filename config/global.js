const base = require('./global.base')

/*eslint-disable no-process-env */
switch(process.env.NODE_ENV) {
    case 'production':
    {
        /* eslint-disable no-console */
        console.log('In Production')
        const prod = require('./global.production.js')
        module.exports = Object.assign({}, base, prod);
        break;
    }
    case 'staging':
    {
        /* eslint-disable no-console */
        console.log('In Staging')
        const staging = require('./global.staging.js')
        module.exports = Object.assign({}, base, staging);
        break;
    }
    default:
    {
        /* eslint-disable no-console */
        console.log('In Dev')
        const dev = require('./global.dev')
        module.exports = Object.assign({}, base, dev);
        break;
    }
}
