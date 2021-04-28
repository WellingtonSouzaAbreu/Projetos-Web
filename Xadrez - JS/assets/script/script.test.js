const {proximaPosicao} = require('./script.js')
const {formatarTimer} = require('./script.js')

describe('Teste para próxima posição no xadrez', () => {

    test('Até o valor 10, deve-se retornar um zero antes', () => {
        const number = 9
        const result = formatarTimer(number)
        expect(result).toEqual(`0${number}`)
    })


    test('Deve retornar uma posição acima do valor passado', () => {
        let v1 = 0
        let v2 = 1
        const result = proximaPosicao('c2', v1, v2)
        expect(result).toEqual('c3')
    })
    test('Deve retornar uma posição acima na diagonal direita do valor passado', () => {
        let v1 = 1
        let v2 = 1
        const result = proximaPosicao('c2', v1, v2)
        expect(result).toEqual('d3')
    })
    test('Deve retornar uma posição direita do valor passado', () => {
        let v1 = 1
        let v2 = 0
        const result = proximaPosicao('c2', v1, v2)
        expect(result).toEqual('d2')
    })
    test('Deve retornar uma posição abaixo na diagonal direita do valor passado', () => {
        let v1 = 1
        let v2 = -1
        const result = proximaPosicao('c2', v1, v2)
        expect(result).toEqual('d1')
    })
    test('Deve retornar uma posição abaixo do valor passado', () => {
        let v1 = 0
        let v2 = -1
        const result = proximaPosicao('c2', v1, v2)
        expect(result).toEqual('c1')
    })
    test('Deve retornar uma posição abaixo na diagonal esquerda do valor passado', () => {
        let v1 = -1
        let v2 = -1
        const result = proximaPosicao('c2', v1, v2)
        expect(result).toEqual('b1')
    })
    test('Deve retornar uma posição esquerda do valor passado', () => {
        let v1 = -1
        let v2 = 0
        const result = proximaPosicao('c2', v1, v2)
        expect(result).toEqual('b2')
    })
    test('Deve retornar uma posição acima na diagonal esquerda do valor passado', () => {
        let v1 = -1
        let v2 = 1
        const result = proximaPosicao('c2', v1, v2)
        expect(result).toEqual('b3')
    })
})