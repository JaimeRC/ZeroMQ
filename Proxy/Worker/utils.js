const utils = {

    showArguments(args) {
        for (var k in args)
            console.log('\tPart', k, ':', args[k].toString())
    }

}

module.exports = utils
