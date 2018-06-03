const client = require('./Client/index')
const broker = require('./Broker/index')
const worker = require('./Worker/index')

module.exports = (req, res) => {

    const { body } = req;

    worker.conection()
    broker.loadBroker()

    setTimeout(() => client.sendMessage(body), 10)

    client.getMessage()
        .then(data => {
            res.statusCode = 200;
            res.json(data)

            client.disconection()
        })
        .catch(err => {
            res.statusCode = 500
            res.json(err)
        })
        
}