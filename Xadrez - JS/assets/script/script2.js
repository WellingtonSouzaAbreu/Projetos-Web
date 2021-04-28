function proximaPosicao(posicao, coluna, linha) {
    proximaPos = (String.fromCodePoint((((posicao.substring(0, 1)).charCodeAt()) + coluna)) + (Number.parseInt((posicao.substring(1, 2))) + linha))
    return proximaPos
}

module.exports = proximaPosicao