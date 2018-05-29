
const utils = {

    getWorkers(workers) {
        let minWorkers = this.calculeMinWorkers(workers);

        for (let key in workers) {
            if (workers[key][1] == minWorkers)
                return key
        }
        return null
    },

    calculeMinWorkers(workers) {
        let min = 999999999

        for (let key in workers) {
            if (workers[key][1] < minWorkers)
                return workers[key][1]
        }
        return min
    },

    clearArgs(args) {
        let newArgs = args.reverse()
        newArgs.pop()
        newArgs.pop()
        return newArgs.reverse()
    },

    showArguments(args) {
        for (var k in args)
            console.log('\tPart', k, ':', args[k].toString());
    }

}

module.exports = utils