const Push = require('./Producer')
const Pull = require('./Worker')

const PushTest = new Push()
const PullTest = new Pull()

PushTest.connection()
PullTest.connection()

let count = 0
setInterval(() => {
    PushTest.sendMessage(`Enviamos el mensaje ${count++}`)
}, 2000)

PullTest.getMessage()
    .then((data: any) => console.log(`Mensage recibido: ${data}`))
    .catch((error: Error) => console.log(`Ha ocurrido un error: ${error}`))

setTimeout(() => closeProcess(), 10000)

function closeProcess(): void {
    clearInterval()
    clearTimeout()
    PushTest.disconnection()
    PullTest.disconnection()
    process.exit()
}
