bloquearEventos() // Bloqueia interações com o tabuleiro

function start() {
    let telaInicial = document.getElementsByClassName('tela-inicial')[0]
    telaInicial.style.height = 0

    preencherTabuleiro()
    limparCemiterio()
    // setarPlayers()
    desbloquearEventos()
    configurarTimer('i')

}

function setarPlayers() { // Update posteriormente
    let player1 = document.getElementById('jogador-white')
    let player2 = document.getElementById('jogador-black')

    player1.innerText = window.prompt('Player 1:') || 'Player 1'
    player2.innerText = window.prompt('Player 2:') || 'Player 2'
}


function reiniciarJogo() {
    preencherTabuleiro()
    limparCemiterio()
    limparInputAux()
    desbloquearEventos()
    configurarTimer('r')
}

function limparInputAux() {
    if (document.getElementById('peca-selecionada').value != "")
        document.getElementById(document.getElementById('peca-selecionada').value).style.opacity = 1 // Limpa a seleção da peça

    document.getElementById('contador-jogada').value = 1 // Zera contador
    document.getElementById('peca-selecionada').value = '' // Limpa peça selecionada
    document.getElementById('destino-selecionado').value = ''  // Limpa destino selecionado
}

function convidarPlayer2() {
    let aux = document.createElement('input')

    aux.setAttribute("Value", window.location.href)
    aux.setAttribute("id", 'clipboard')
    document.body.appendChild(aux)
    aux.select()
    document.execCommand('copy')
    // document.removeChild(aux) //Deveria excluir o componente
    aux.style.visibility = 'hidden'
}

function setarInfoImage(opcao) {
    let titulo = document.querySelector('.tela-ajuda__body-inner h3')
    let infoArea = document.querySelector('.tela-ajuda-info p')
    let imageArea = document.querySelector('.tela-ajuda-image img')

    switch (opcao) {
        case 'Peão': {
            titulo.innerText = opcao
            infoArea.innerText = `De maneira geral, os peões se movem somente para frente, uma casa por vez, apenas o primeiro movimento permite pular duas casas. O peão não pode pular outras peças. O peão é a única peça que não pode mover-se para trás. Os peões capturam a peça adversária movendo-se diagonalmente uma casa, ele não pode capturar movendo-se para frente. O peão conta com um movimento especial chamado ‘promoção’, que permite o peão ser promovido para outra peça quando ele atinge o final do tabuleiro.`
            imageArea.src = './assets/img/movimentos-peao.jpeg'
            break
        }
        case 'Torre': {
            titulo.innerText = opcao
            infoArea.innerText = `A torre se move em linha reta horizontalmente e verticalmente pelo número de casas não ocupadas, até atingir o final do tabuleiro ou ser bloqueado por outra peça. Ele não pode pular outras peças. A torre captura no mesmo caminho em que se move, ocupando a casa onde se encontra a peça adversária. A torre pode parar em qualquer casa do tabuleiro, sendo por isso uma das peças mais poderosas.`
            imageArea.src = './assets/img/movimentos-torre.jpeg'
            break
        }
        case 'Cavalo': {
            titulo.innerText = opcao
            infoArea.innerText = `O cavalo é a peça mais especial no xadrez, possuindo uma flexibilidade que o torna poderoso. O cavalo move-se por duas casas horizontalmente ou verticalmente e então uma casa a mais em uma ângulo reto. O movimento do cavalo forma um “L”. O cavalo sempre termina seu movimento em uma casa de cor oposta à inicial. O cavalo pode pular sobre peças de qualquer cor enquanto vai para sua casa de destino, mas ele não captura nenhuma das peças que pula. O cavalo captura quando termina seu movimento na casa de uma peça adversária. O cavalo não pode terminar seu movimento em uma casa ocupada por uma peça da mesma cor. Uma vez que o movimento do cavalo não é em linha reta, ele pode atacar uma rainha, bispo ou torre sem ser atacado reciprocamente por esta peça.`
            imageArea.src = './assets/img/movimentos-cavalo.jpeg'
            break
        }
        case 'Bispo': {
            titulo.innerText = opcao
            infoArea.innerText = `O bispo se move em uma linha reta diagonalmente no tabuleiro. Ele pode mover-se por tantas casas quantas quiser, até encontrar o final do tabuleiro ou outra peça. O bispo não pode pular outras peças. O bispo captura no mesmo caminho em que ele se move, parando na casa da peça adversária. Devido à maneira como os bispos se movem, ele sempre permanece em casas da cor em que ele iniciou. Cada jogador começa com dois bispos, um nas casas pretas e outro nas brancas.`
            imageArea.src = './assets/img/movimentos-bispo.jpeg'
            break
        }
        case 'Rainha': {
            titulo.innerText = opcao
            infoArea.innerText = `A rainha é considerada a peça mais poderosa do tabuleiro. Ela pode mover-se qualquer número de casas em linha reta - verticalmente, horizontalmente ou diagonalmente. A rainha se move como a torre e o bispo combinados. A menos que esteja realizando uma captura, o movimento deve terminar em uma casa desocupada e ela não pode pular outras peças. A rainha captura no mesmo caminho em que se move, ocupando a casa da peça adversária.`
            imageArea.src = './assets/img/movimentos-rainha.jpeg'
            break
        }
        case 'Rei': {
            titulo.innerText = opcao
            infoArea.innerText = `O rei é a peça mais importante do xadrez. Se o rei for encurralado de modo que sua captura seja inevitável, o jogo termina e o este jogador perde. O rei tem pouca mobilidade, assim ele é considerado também uma das peças mais fracas no jogo. O rei pode se mover para qualquer casa vizinha. Ele não pode se mover para uma casa ocupada por uma peça da mesma cor. O rei captura outra peça da mesma maneira que se move, ocupando a casa da peça adversária. O rei não pode se mover para uma casa que o coloque sob ataque de uma peça adversária (chamado em “cheque”). Como resultado desta limitação, dois reis nunca poderão estar ao lado um do outro - uma vez que mover-se para o lado do outro rei o colocaria em cheque.`
            imageArea.src = './assets/img/movimentos-rei.jpeg'
            break
        }
    }
}

function configurarMenuItems() {
    let menuItem = document.querySelectorAll('.tela-ajuda__aside li')

    menuItem.forEach(item => {
        item.onclick = function (event) {
            let opcao = event.target.innerText
            setarInfoImage(opcao)
        }
    })
}

function apresentarTelaAjuda() {
    let telaAjuda = document.querySelector('.tela-ajuda')
    telaAjuda.style.display = 'flex'
    telaAjuda.style.height = '600px'
    bloquearEventos()

    let menuFlex = document.querySelectorAll('.tela-ajuda__aside ul')
    menuFlex.forEach(menu => {
        menu.onmouseover = function (event) {
            menu.style.height = '255px'
        }

        menu.onmouseout = function (event) {
            menu.style.height = '34px'
        }

        configurarMenuItems()
    })

    document.querySelectorAll('.bt-close')[1].onclick = function (event) {
        telaAjuda.style.height = '0px'
        desbloquearEventos()
    }
}

function setPrimeiraFileira(pos, corPeca) {
    let primeiraLinha = 1 // Primeira de cada jogador

    if (corPeca == 'black') {
        primeiraLinha = 8
    }

    if (pos == `a${primeiraLinha}` || pos == `h${primeiraLinha}`) { // Primeira fileira /Torres
        document.getElementById(pos).style.backgroundImage = `url(./assets/img/torre-${corPeca}.png)`
    }
    if (pos == `b${primeiraLinha}` || pos == `g${primeiraLinha}`) { // Primeira fileira /Cavalos
        document.getElementById(pos).style.backgroundImage = `url(./assets/img/cavalo-${corPeca}.png)`
    }
    if (pos == `c${primeiraLinha}` || pos == `f${primeiraLinha}`) { // Primeira fileira /Bispos
        document.getElementById(pos).style.backgroundImage = `url(./assets/img/bispo-${corPeca}.png)`
    }
    if (pos == `d${primeiraLinha}`) { // Primeira fileira /Rainha
        document.getElementById(pos).style.backgroundImage = `url(./assets/img/rainha-${corPeca}.png)`
    }
    if (pos == `e${primeiraLinha}`) { // Primeira fileira /Rei
        document.getElementById(pos).style.backgroundImage = `url(./assets/img/rei-${corPeca}.png)`
    }
}

function setPeoes(pos, corPeca) {
    document.getElementById(pos).style.backgroundImage = `url(./assets/img/peon-${corPeca}.png)` // url(./assets/img/peon-${corPeca}.png)
}

function preencherTabuleiro() {
    let corPeca = 'white' // Colocar para fora do for (testar)

    for (let line = 1; line <= 8; line++) {
        let coluna = 'a' // Reseta coluna apos percorer toda a linha com o 'for'
        while (coluna != 'i') {
            let pos = (coluna + line)

            if (line > 2 && line < 7) { // Espaços vagos
                document.getElementById(pos).style.backgroundImage = 'unset'
            } else {
                if (line == 7) { // linha 7 corresposde as peças pretas
                    corPeca = 'black'
                }
                if (line == 2 || line == 7) { // Peões
                    setPeoes(pos, corPeca)
                } else {
                    setPrimeiraFileira(pos, corPeca)
                }
            }
            coluna = String.fromCodePoint(coluna.charCodeAt() + 1)
        }
    }
}

function limparCemiterio() {
    let alvo = ['white', 'black']
    for (let j = 0; j <= 1; j++) {
        for (let i = 0; i <= 15; i++) {
            document.querySelectorAll(`.cemiterio-${alvo[j]} .cemiterio-posicao`)[i].style.backgroundImage = `unset`
            document.querySelectorAll(`.cemiterio-${alvo[j]} .cemiterio-posicao`)[i].style.pointerEvents = 'none'
        }
    }
}

function formatarTimer(time) {
    return '0' + time.toString()
}

function configurarTimer(comando) {

    switch (comando) {
        case 'i': setInterval(() => {
            let timer = document.getElementById('timer')
            let tempo = (timer.innerText).split(':')

            let horas = tempo[0]// Posições 2 e 5 representam os dois pontos
            let minutos = tempo[1] || '00'
            let segundos = tempo[2] || '00'

            if (segundos <= 58) {
                segundos = parseInt(segundos) + 1
                if (segundos < 10) {
                    segundos = formatarTimer(segundos)
                }
            }

            if (segundos == 59) {
                minutos = parseInt(minutos) + 1
                segundos = formatarTimer(0)
                if (minutos < 10) {
                    minutos = formatarTimer(minutos)
                }
            }

            if (minutos == 60) {   //Minutos é gerado pelo laço condicional anterior
                horas = parseInt(horas) + 1
                minutos = formatarTimer(0)
                if (horas < 10) {
                    horas = formatarTimer(horas)
                }
            }
            console.log(`${horas}:${minutos}:${segundos}`)
            timer.innerText = `${horas}:${minutos}:${segundos}`
        }, 1000)
            break
        case 'r': document.getElementById('timer').innerText = '00:00:00' //Zera o timer
            break
    }
}

function selecionarDestino(posicao) {
    let destinoSelecionado = document.getElementById('destino-selecionado')
    destinoSelecionado.value = posicao

    realizarMovimento()
}

function jogadorCorrente() {
    let contadorJogadas = document.getElementById('contador-jogada')
    if (Number.parseInt(contadorJogadas.value) % 2 == 1) {        // Verifica a jogada corrente
        return 'w' // 'W'hite 
    } else {
        return 'k' //Blac'K'
    }
}

function selecionarPeca(posicao) {
    // let contadorJogadas = Number.parseInt(document.getElementById('contador-jogada').value)
    let pecaSelecionada = document.getElementById('peca-selecionada')
    let jogador = jogadorCorrente()

    if (posicao.style.backgroundImage == 'unset') {       // Verifica se há peça na posicao
        if (pecaSelecionada.value == '') {
            window.alert('Selecione uma peça para jogar')
        } else {
            selecionarDestino(posicao.id) // Movimento Passivo
        }
    } else {
        if (posicao.style.backgroundImage.indexOf(jogador) != -1) { // Verifica se a peca selecionada é da mesma cor
            if (pecaSelecionada.value != '') {
                document.getElementById(pecaSelecionada.value).style.opacity = '1' // Remove opacidade da ultima peça selecionada
            }
            document.getElementById(posicao.id).style.opacity = '0.6' // Adicionar opacidade a peça selecionada
            pecaSelecionada.value = posicao.id
        } else {
            if (pecaSelecionada.value == '') {
                window.alert('selecione suas peças!')
            } else {
                selecionarDestino(posicao.id) // Movimento Ofensivo
            }
        }
    }
}

function obterTipoPeca() {
    let peca = document.getElementById(document.getElementById('peca-selecionada').value) //Peca selecionada armazena a posicao da peca selecionada

    let tipo = peca.style.backgroundImage.substring(18, 20) //Retorna as 2 primeiras letras do nome da peca
    //window.alert(tipo)
    return tipo
}

function obterDirecaoJogada(tipoPeca) {
    let origem = document.getElementById('peca-selecionada').value
    let destino = document.getElementById('destino-selecionado').value
    let [colunaO, linhaO] = [origem.substring(0, 1), origem.substring(1, 2)] // Dividindo posicao de origem
    let [colunaD, linhaD] = [destino.substring(0, 1), destino.substring(1, 2)] // Dividindo posicao de destino

    //window.alert(`${origem}, ${destino}, ${colunaO}, ${linhaO}, ${colunaD}, ${linhaD}` )

    switch (tipoPeca) {
        case 'pe': {
            if (colunaO == colunaD && linhaO < linhaD && jogadorCorrente() == 'w') {
                return 'acima'
            }
            if (colunaO > colunaD && linhaO < linhaD) {
                return 'diagonal-esq-sup'
            }
            if (colunaO < colunaD && linhaO < linhaD) {
                return 'diagonal-dir-sup'
            }
            if (colunaO < colunaD && linhaO > linhaD) {
                return 'diagonal-dir-inf'
            }
            if (colunaO == colunaD && linhaO > linhaD && jogadorCorrente() == 'k') {
                return 'tras'
            }
            if (colunaO > colunaD && linhaO > linhaD) {
                return 'diagonal-esq-inf'
            }
            break
        }

        case 'to': {
            if (colunaO == colunaD && linhaO < linhaD) {
                return 'acima'
            }
            if (colunaO < colunaD && linhaO == linhaD) {
                return 'direita'
            }
            if (colunaO == colunaD && linhaO > linhaD) {
                return 'tras'
            }
            if (colunaO > colunaD && linhaO == linhaD) {
                return 'esquerda'
            }
            break
        }

        case 'ca': {
            let posicoesValidasCavalo = []
            posicoesValidasCavalo.push(String.fromCodePoint(((colunaO.charCodeAt()) - 1)) + (Number.parseInt(linhaO) + 2)) // Para cima à esquerda
            posicoesValidasCavalo.push(String.fromCodePoint(((colunaO.charCodeAt()) + 1)) + (Number.parseInt(linhaO) + 2)) // Para cima à direita

            posicoesValidasCavalo.push(String.fromCodePoint(((colunaO.charCodeAt()) + 2)) + (Number.parseInt(linhaO) + 1)) // Para direita acima
            posicoesValidasCavalo.push(String.fromCodePoint(((colunaO.charCodeAt()) + 2)) + (Number.parseInt(linhaO) - 1)) // Para direita abaixo

            posicoesValidasCavalo.push(String.fromCodePoint(((colunaO.charCodeAt()) + 1)) + (Number.parseInt(linhaO) - 2)) // Para baixo à direita
            posicoesValidasCavalo.push(String.fromCodePoint(((colunaO.charCodeAt()) - 1)) + (Number.parseInt(linhaO) - 2)) // Para baixo à esquerda

            posicoesValidasCavalo.push(String.fromCodePoint(((colunaO.charCodeAt()) - 2)) + (Number.parseInt(linhaO) - 1)) // Para esquerda abaixo
            posicoesValidasCavalo.push(String.fromCodePoint(((colunaO.charCodeAt()) - 2)) + (Number.parseInt(linhaO) + 1)) // Para esquerda acima

            return posicoesValidasCavalo
            break
        }
        case 'bi': {
            if (colunaO < colunaD && linhaO < linhaD) {
                return 'diagonal-dir-sup'
            }
            if (colunaO < colunaD && linhaO > linhaD) {
                return 'diagonal-dir-inf'
            }
            if (colunaO > colunaD && linhaO > linhaD) {
                return 'diagonal-esq-inf'
            }
            if (colunaO > colunaD && linhaO < linhaD) {
                return 'diagonal-esq-sup'
            }
            break
        }
        case 'ra': {
            if (colunaO == colunaD && linhaO < linhaD) {
                return 'acima'
            }
            if (colunaO < colunaD && linhaO < linhaD) {
                return 'diagonal-dir-sup'
            }
            if (colunaO < colunaD && linhaO == linhaD) {
                return 'direita'
            }
            if (colunaO < colunaD && linhaO > linhaD) {
                return 'diagonal-dir-inf'
            }
            if (colunaO == colunaD && linhaO > linhaD) {
                return 'tras'
            }
            if (colunaO > colunaD && linhaO > linhaD) {
                return 'diagonal-esq-inf'
            }
            if (colunaO > colunaD && linhaO == linhaD) {
                return 'esquerda'
            }
            if (colunaO > colunaD && linhaO < linhaD) {
                return 'diagonal-esq-sup'
            }
            break
        }
        case 're': {
            if (colunaO == colunaD && linhaO < linhaD) {
                return 'acima'
            }
            if (colunaO < colunaD && linhaO < linhaD) {
                return 'diagonal-dir-sup'
            }
            if (colunaO < colunaD && linhaO == linhaD) {
                return 'direita'
            }
            if (colunaO < colunaD && linhaO > linhaD) {
                return 'diagonal-dir-inf'
            }
            if (colunaO == colunaD && linhaO > linhaD) {
                return 'tras'
            }
            if (colunaO > colunaD && linhaO > linhaD) {
                return 'diagonal-esq-inf'
            }
            if (colunaO > colunaD && linhaO == linhaD) {
                return 'esquerda'
            }
            if (colunaO > colunaD && linhaO < linhaD) {
                return 'diagonal-esq-sup'
            }
            break
        }
    }
}

function proximaPosicao(posicao, coluna, linha) {
    proximaPos = (String.fromCodePoint((((posicao.substring(0, 1)).charCodeAt()) + coluna)) + (Number.parseInt((posicao.substring(1, 2))) + linha))
    return proximaPos
}

function efetuarJogada(origem, destino, posicao, deslocamento) {
    if (posicao == destino) {
        document.getElementById(destino).style.backgroundImage = document.getElementById(origem).style.backgroundImage // Realizando movimento
        document.getElementById(origem).style.backgroundImage = 'unset' // Limpando posicao anterior
        incrementarContador() // Jogada bem sucedida, incremento no contador
    } else {
        if (proximaPosicao(posicao, deslocamento[0], deslocamento[1]) == destino) { // Essa função deve ser alterada a  cada tipo de movimento
            moverParaCemiterio(destino) // Encaminhar a peça comida ao cemiterio
            document.getElementById(destino).style.backgroundImage = document.getElementById(origem).style.backgroundImage // Realizando movimento
            document.getElementById(origem).style.backgroundImage = 'unset' // Limpando posicao anterior
            incrementarContador() // Jogada bem sucedida, incremento no contador
        }
        else {
            window.alert(`Posição Inválida!
Está com dúvidas? Acesse ajuda ao lado`)
        }
    }
}


function bloquearEventos() {
    document.querySelectorAll('.posicao').forEach(posicao => {
        posicao.style.pointerEvents = 'none'
    })

    let botoes = Array.from(document.querySelectorAll('.opcao-menu input'))
    botoes.forEach(botao => {
        botao.style.pointerEvents = 'none'
    })
}

function desbloquearEventos() {
    document.querySelectorAll('.posicao').forEach(posicao => {
        posicao.style.pointerEvents = 'auto'
    })

    let botoes = Array.from(document.querySelectorAll('.opcao-menu input'))
    botoes.forEach(botao => {
        botao.style.pointerEvents = 'auto'
    })
}

function apresentarTelaVitoria(corPeca) {
    let telaVitoria = document.querySelector('.tela-vitoria')
    let logVitoria = document.querySelector('.log-vencedor')

    telaVitoria.style.height = '470px'
    telaVitoria.style.opacity = '1'
    telaVitoria.style.backgroundImage = `url(./assets/img/pecas-${corPeca}.jpg)`

    logVitoria.innerText = `Parabéns Keila!` // Jogador referente

    document.querySelector('.bt-close').onclick = (event) => {
        telaVitoria.style.height = '0px'
        telaVitoria.style.opacity = '0'
    }
    bloquearEventos()
}

function moverParaCemiterio(destino) {
    let alvo

    if (jogadorCorrente() == 'w') {
        alvo = 'white'
    } else {
        alvo = 'black'
    }

    if (document.getElementById(destino).style.backgroundImage.indexOf('rei') != -1) { //Verifica se foi xeque-mate
        apresentarTelaVitoria(alvo)
    }

    for (let i = 0; i <= 15; i++) {
        if (document.querySelectorAll(`.cemiterio-${alvo} .cemiterio-posicao`)[i].style.backgroundImage == 'unset') { // Percorer o cemitério em busca de uma local vazio
            document.querySelectorAll(`.cemiterio-${alvo} .cemiterio-posicao`)[i].style.backgroundImage = document.getElementById(destino).style.backgroundImage
            break
        }
    }
}

function trocarPeca(destino) {
    let blocoTrocarPeca = document.querySelector('.trocar-peca')
    let corPeca
    let gradient


    if (jogadorCorrente() == 'w') {
        corPeca = 'white'
        gradient = 'white, black, white'
    } else {
        corPeca = 'black'
        gradient = 'black, white, black'
    }

    blocoTrocarPeca.style.backgroundImage = `linear-gradient(${gradient})` // Aplica o gradient relativo a cor da peça
    blocoTrocarPeca.style.height = '200px' /* Configura animação de entrada */
    blocoTrocarPeca.style.padding = '20px'

    document.querySelectorAll('.pecas-troca').forEach((peca, i) => {
        let pecas = [`url(./assets/img/torre-${corPeca}.png)`, `url(./assets/img/cavalo-${corPeca}.png)`, `url(./assets/img/bispo-${corPeca}.png)`, `url(./assets/img/rainha-${corPeca}.png)`]
        peca.style.backgroundImage = pecas[i]

        peca.onclick = (event) => {
            document.querySelector(`#${destino}`).style.backgroundImage = peca.style.backgroundImage
            blocoTrocarPeca.style.height = '0'
            blocoTrocarPeca.style.padding = '0'
        }
    })

}

function efetuarJogadaUmMovimento(origem, destino, deslocamento, tipoPeca) {
    let proximaPos = proximaPosicao(origem, deslocamento[0], deslocamento[1])
    if (tipoPeca == 'pe') {

        if (deslocamento[0] == 0) { // Verifica se ele se moveu para cima ou para baixo(coluna)
            if (destino == proximaPosicao(proximaPos, deslocamento[0], deslocamento[1])) {
                if (origem.substring(1, 2) == '2' || origem.substring(1, 2) == '7') {
                    proximaPos = proximaPosicao(proximaPos, deslocamento[0], deslocamento[1])
                }
            }

            if (proximaPos == destino && document.getElementById(proximaPos).style.backgroundImage == 'unset') {
                document.getElementById(destino).style.backgroundImage = document.getElementById(origem).style.backgroundImage // Realizando movimento
                document.getElementById(origem).style.backgroundImage = 'unset' // Limpando posicao anterior
                if (proximaPos.substring(1, 2) == '8' || proximaPos.substring(1, 2) == '1') { // Verifica se o peão chegou ao outro lado
                    trocarPeca(destino)
                }
                incrementarContador()
            } else {
                window.alert(`Jogada Inválida!
                            Está com dúvidas? Acesse ajuda ao lado`)
            }
        } else { //Se o peão não se moveu para cima, então ele tentou atacar alguma peça
            if (document.getElementById(proximaPos).style.backgroundImage != 'unset') {
                moverParaCemiterio(destino) // Encaminhar a peça comida ao cemiterio
                document.getElementById(destino).style.backgroundImage = document.getElementById(origem).style.backgroundImage // Realizando movimento
                document.getElementById(origem).style.backgroundImage = 'unset' // Limpando posicao anterior
                if (proximaPos.substring(1, 2) == '8' || proximaPos.substring(1, 2) == '1') { // Verifica se o peão chegou ao outro lado
                    trocarPeca(destino)
                }
                incrementarContador()
            } else {
                window.alert(`Jogada Inválida!
                            Está com dúvidas? Acesse ajuda ao lado`)
            }
        }

    } else {                                  //Rei
        if (proximaPos == destino) {
            if (document.getElementById(destino).style.backgroundImage.indexOf('rei') == -1) {
                if (document.getElementById(destino).style.backgroundImage != 'unset') {
                    moverParaCemiterio(destino) // Encaminhar a peça comida ao cemiterio
                }
                document.getElementById(destino).style.backgroundImage = document.getElementById(origem).style.backgroundImage // Realizando movimento
                document.getElementById(origem).style.backgroundImage = 'unset' // Limpando posicao anterior
                incrementarContador() // Jogada bem sucedida, incremento no contador
            } else {
                window.alert(`Jogada Inválida!
Está com dúvidas? Acesse ajuda ao lado`)
            }
        } else {
            window.alert(`Jogada Inválida!
Está com dúvidas? Acesse ajuda ao lado`)
        }
    }

}

function incrementarContador() {
    document.getElementById('contador-jogada').value = parseInt(document.getElementById('contador-jogada').value) + 1
}

function realizarMovimento() {
    let origem = document.getElementById('peca-selecionada').value
    let destino = document.getElementById('destino-selecionado').value
    let tipoPeca = obterTipoPeca()
    let direcaoJogada = obterDirecaoJogada(tipoPeca)
    let colidiu
    let posicao
    let deslocamento = []

    // window.alert(tipoPeca)               // Usado para fins de teste
    // window.alert(`${direcaoJogada}`) 

    if (direcaoJogada != undefined) {
        switch (direcaoJogada) {
            case 'acima': {
                colidiu = false
                posicao = origem
                deslocamento.push(0, 1) // Incremento em Colunas e linhas para seguir para proxima posicao

                if (tipoPeca == 'pe' || tipoPeca == 're') {
                    efetuarJogadaUmMovimento(origem, destino, deslocamento, tipoPeca) // Efetuar jogada para peças que se movem apenas uma casa
                    break
                }
                while (colidiu == false) {
                    if (document.getElementById(proximaPosicao(posicao, deslocamento[0], deslocamento[1])).style.backgroundImage == 'unset' && posicao != destino) {
                        posicao = proximaPosicao(posicao, deslocamento[0], deslocamento[1])
                        if (/* posicao.substring(0, 1) == 'h' ||  */posicao.substring(1, 2) == '8') {
                            colidiu = true
                            // window.alert('Limite')
                        }
                    } else {
                        colidiu = true
                        // window.alert('Destino ou colisão')
                    }
                }

                efetuarJogada(origem, destino, posicao, deslocamento) // Troca a peça de lugar se for possível
                break
            } // Acima

            case 'diagonal-dir-sup': {
                colidiu = false
                posicao = origem
                deslocamento.push(1, 1) // Incremento em Colunas e linhas para seguir para proxima posicao

                if (tipoPeca == 'pe' || tipoPeca == 're') {
                    efetuarJogadaUmMovimento(origem, destino, deslocamento, tipoPeca) // Efetuar jogada para peças que se movem apenas uma casa
                    break
                }

                while (colidiu == false) {
                    if (document.getElementById(proximaPosicao(posicao, deslocamento[0], deslocamento[1])).style.backgroundImage == 'unset' && posicao != destino) {
                        posicao = proximaPosicao(posicao, deslocamento[0], deslocamento[1])
                        if (posicao.substring(0, 1) == 'h' || posicao.substring(1, 2) == '8') {
                            colidiu = true
                            // window.alert('Limite')
                        }
                    } else {
                        colidiu = true
                        // window.alert('Destino ou colisão')
                    }
                }

                efetuarJogada(origem, destino, posicao, deslocamento) // Troca a peça de lugar se for possível
                break
            }   // Diagonal direita superior

            case 'direita': {
                colidiu = false
                posicao = origem
                deslocamento.push(1, 0) // Incremento em Colunas e linhas para seguir para proxima posicao

                if (tipoPeca == 're') {
                    efetuarJogadaUmMovimento(origem, destino, deslocamento, tipoPeca) // Efetuar jogada para peças que se movem apenas uma casa
                    break
                }

                while (colidiu == false) {
                    if (document.getElementById(proximaPosicao(posicao, deslocamento[0], deslocamento[1])).style.backgroundImage == 'unset' && posicao != destino) {
                        posicao = proximaPosicao(posicao, deslocamento[0], deslocamento[1])
                        if (posicao.substring(0, 1) == 'h'/*  ||  posicao.substring(1, 2) == '8' */) {
                            colidiu = true
                            // window.alert('Limite')
                        }
                    } else {
                        colidiu = true
                        // window.alert('Destino ou colisão')
                    }
                }

                efetuarJogada(origem, destino, posicao, deslocamento) // Troca a peça de lugar se for possível
                break
            } // Direita

            case 'diagonal-dir-inf': {
                colidiu = false
                posicao = origem
                deslocamento.push(1, -1) // Incremento em Colunas e linhas para seguir para proxima posicao

                if (tipoPeca == 'pe' || tipoPeca == 're') {
                    efetuarJogadaUmMovimento(origem, destino, deslocamento, tipoPeca) // Efetuar jogada para peças que se movem apenas uma casa
                    break
                }

                while (colidiu == false) {
                    if (document.getElementById(proximaPosicao(posicao, deslocamento[0], deslocamento[1])).style.backgroundImage == 'unset' && posicao != destino) {
                        posicao = proximaPosicao(posicao, deslocamento[0], deslocamento[1])
                        if (posicao.substring(0, 1) == 'h' || posicao.substring(1, 2) == '1') {
                            colidiu = true
                            // window.alert('Limite')
                        }
                    } else {
                        colidiu = true
                        // window.alert('Destino ou colisão')
                    }
                }

                efetuarJogada(origem, destino, posicao, deslocamento) // Troca a peça de lugar se for possível
                break
            } // Diagonal direita inferior

            case 'tras': {
                colidiu = false
                posicao = origem
                deslocamento.push(0, -1) // Incremento em Colunas e linhas para seguir para proxima posicao

                if (tipoPeca == 'pe' || tipoPeca == 're') {
                    efetuarJogadaUmMovimento(origem, destino, deslocamento, tipoPeca) // Efetuar jogada para peças que se movem apenas uma casa
                    break
                }

                while (colidiu == false) {
                    if (document.getElementById(proximaPosicao(posicao, deslocamento[0], deslocamento[1])).style.backgroundImage == 'unset' && posicao != destino) {
                        posicao = proximaPosicao(posicao, deslocamento[0], deslocamento[1])
                        if (/* posicao.substring(0, 1) == 'h' ||  */posicao.substring(1, 2) == '1') {
                            colidiu = true
                            // window.alert('Limite')
                        }
                    } else {
                        colidiu = true
                        // window.alert('Destino ou colisão')
                    }
                }
                //window.alert(`pos ${posicao}, ${destino}`)

                efetuarJogada(origem, destino, posicao, deslocamento) // Troca a peça de lugar se for possível
                break
            } // Tras

            case 'diagonal-esq-inf': {
                colidiu = false
                posicao = origem
                deslocamento.push(-1, -1) // Incremento em Colunas e linhas para seguir para proxima posicao

                if (tipoPeca == 'pe' || tipoPeca == 're') {
                    efetuarJogadaUmMovimento(origem, destino, deslocamento, tipoPeca) // Efetuar jogada para peças que se movem apenas uma casa
                    break
                }

                while (colidiu == false) {
                    if (document.getElementById(proximaPosicao(posicao, deslocamento[0], deslocamento[1])).style.backgroundImage == 'unset' && posicao != destino) {
                        posicao = proximaPosicao(posicao, deslocamento[0], deslocamento[1])
                        if (posicao.substring(0, 1) == 'a' || posicao.substring(1, 2) == '1') {
                            colidiu = true
                            // window.alert('Limite')
                        }
                    } else {
                        colidiu = true
                        // window.alert('Destino ou colisão')
                    }
                }

                efetuarJogada(origem, destino, posicao, deslocamento) // Troca a peça de lugar se for possível
                break
            } // Diagonal esquerda inferior

            case 'esquerda': {
                colidiu = false
                posicao = origem
                deslocamento.push(-1, 0) // Incremento em Colunas e linhas para seguir para proxima posicao

                if (tipoPeca == 're') {
                    efetuarJogadaUmMovimento(origem, destino, deslocamento, tipoPeca) // Efetuar jogada para peças que se movem apenas uma casa
                    break
                }

                while (colidiu == false) {
                    if (document.getElementById(proximaPosicao(posicao, deslocamento[0], deslocamento[1])).style.backgroundImage == 'unset' && posicao != destino) {
                        posicao = proximaPosicao(posicao, deslocamento[0], deslocamento[1])
                        if (posicao.substring(0, 1) == 'a' /* || posicao.substring(1, 2) == '1' */) {
                            colidiu = true
                            // window.alert('Limite')
                        }
                    } else {
                        colidiu = true
                        // window.alert('Destino ou colisão')
                    }
                }

                efetuarJogada(origem, destino, posicao, deslocamento) // Troca a peça de lugar se for possível
                break
            } // Esquerda

            case 'diagonal-esq-sup': {
                colidiu = false
                posicao = origem
                deslocamento.push(-1, 1) // Incremento em Colunas e linhas para seguir para proxima posicao

                if (tipoPeca == 'pe' || tipoPeca == 're') {
                    efetuarJogadaUmMovimento(origem, destino, deslocamento, tipoPeca) // Efetuar jogada para peças que se movem apenas uma casa
                    break
                }

                while (colidiu == false) {
                    if (document.getElementById(proximaPosicao(posicao, deslocamento[0], deslocamento[1])).style.backgroundImage == 'unset' && posicao != destino) {
                        posicao = proximaPosicao(posicao, deslocamento[0], deslocamento[1])
                        if (posicao.substring(0, 1) == 'a' || posicao.substring(1, 2) == '8') {
                            colidiu = true
                            // window.alert('Limite')
                        }
                    } else {
                        colidiu = true
                        // window.alert('Destino ou colisão')
                    }
                }

                efetuarJogada(origem, destino, posicao, deslocamento) // Troca a peça de lugar se for possível
                break
            } // Diagonal esquerda superior

            default: { //Cavalo // Acessa isso quando é retornado um array
                let posicaoValida = false
                direcaoJogada.forEach(i => {
                    if (i == destino) {
                        moverParaCemiterio(destino)
                        document.getElementById(destino).style.backgroundImage = document.getElementById(origem).style.backgroundImage // Realizando movimento
                        document.getElementById(origem).style.backgroundImage = 'unset' // Limpando posicao anterior
                        posicaoValida = true
                        incrementarContador()
                    }
                })

                if (posicaoValida == false) {
                    window.alert(`Posição Inválida!
Está com dúvidas? Acesse ajuda ao lado`)
                }

            } // Cavalo

        }

    } else {
        window.alert(`Posição Inválida!
Está com dúvidas? Acesse ajuda ao lado`)
    }

    // Ações ao fim de cada jogada, bem sucedida ou não
    document.getElementById(origem).style.opacity = '1'   // Tira marcação de seleção
}




// Linah 57
// Restam cavalo, peao e rei a serem configurados o info
