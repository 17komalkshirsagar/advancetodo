const validator = require("validator")

exports.checkEmpty = (config) => {
    const error = {}
    let isError = false
    for (const item in config) {
        console.log()

        if (validator.isEmpty(config[item] ? "" + config[item] : "")) {
            error[item] = `${item} Is Required`
            isError = true
        }
    }
    return { isError, error }
} 