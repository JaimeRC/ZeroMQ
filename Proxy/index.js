const client = require('./Client/index'),
    broker = require('./Broker/index'),
    worker = require('./Worker/index')

module.exports = (req, res) => {

    const { body } = req;

    broker.loadBroker()
    //setTimeout(() => worker.conection(), 10)
    setTimeout(() => {
        worker.conection()
        client.sendMessage(body)
    }, 10)

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