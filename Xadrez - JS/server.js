const express = require('express')
const path = require('path')
const ejs = require('ejs')
const { Socket } = require('dgram')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname/* , 'public' */)))
app.set('views', path.join(__dirname))
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')

let jogadores = {
    player1: null,
    player2: null
}

io.on('connection', socket => {

    console.log(`Socket conectado: ${socket.id}`)

    socket.on('setJogador', jogador => {
        socket.id = jogador
        console.log(`Socket conectado: ${socket.id}`)

        if (jogadores.player1 == null) {
            jogadores.player1 = jogador
        } else {
            if (jogadores.player2 == null) {
                jogadores.player2 = jogador
            } else {
                socket.disconnect()
            }
        }

        socket.broadcast.emit('setJogadores', jogadores) // Configura nome dos jogadores
    })


    socket.on('disconnect', () => {
        console.log('user disconnected: ' + socket.id)
        Object.values(jogadores).forEach((e, i) => {
            if (e == socket.id)
                delete jogadores[Object.keys(jogadores)[i]]
        })
        console.log('jogadores conectados: '+ jogadores)
    })

    socket.on('enviarMensagem', ObjMensagem => {
        console.log(`${ObjMensagem.autor}: ${ObjMensagem.mensagem}`)
        if(socket.id == jogadores.player1 || socket.id == jogadores.player2) // Bloqueia mensagens de outros players
            socket.broadcast.emit('receberMensagem', ObjMensagem)
    })

    socket.on('atualizarJogo', (jogoAtual,contadorJogadas) => {
        socket.broadcast.emit('atualizar', jogoAtual, contadorJogadas)
    })
})










server.listen(777, () => {
    console.log('Server running in port 777...')
})