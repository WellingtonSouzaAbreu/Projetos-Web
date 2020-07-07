
// QUESTÕES DESCRITIVAS
/* `<div class="saida"> <h3 class="enunciado">${enunciado[i]}</h3><hr>
    <div class="resposta">
        <label><strong>Resposta:</strong></label></br>
        <textarea class="inputResposta"></textarea>
    </div>

</div><hr>`  */





function apresentarQuestoes(){
    let enunciado = ['Quem descobriu o Brasil?', 'A palavra rosa tem quantas letras?']
    let tipo = ['desc','mult']
    let alternativas = ['Uma','Duas','Três','Quatro','Cinco']
    let scsaida = document.getElementById('scPrincipal')

    

    scsaida.innerHTML = ''
    let i
    for(i = 0; i < enunciado.length; i++){
        switch(tipo[i]){
            case 'desc': 
                scsaida.innerHTML += `<div class="saida"> <h3 class="enunciado">${enunciado[i]}</h3><hr>
                                        <div class="resposta">
                                            <label><strong>Resposta:</strong></label></br>
                                            <textarea class="inputResposta"></textarea>
                                        </div>
                                    
                                    </div><hr>`
                break
            
            
            //CASE NÃO FUNCIONANDO

            case 'mult': 
                 scsaida.innerHTML += `<div class="saida">
                                <h3 class="enunciado">${enunciado[i]}</h3><hr>
                                <div class="resposta">
                                    <label><strong>Escolha uma alternativa:</strong></label></br>
                                    <div id="cnAlternativas">
                                        <label class="lbAlternativas"><input type="radio" name="radio" class="clRadio" value="a">A) </label></br>
                                        <label class="lbAlternativas"><input type="radio" name="radio" class="clRadio" value="b">B) </label></br>
                                        <label class="lbAlternativas"><input type="radio" name="radio" class="clRadio" value="c">C) </label></br>
                                        <label class="lbAlternativas"><input type="radio" name="radio" class="clRadio" value="d">D) </label></br>
                                        <label class="lbAlternativas"><input type="radio" name="radio" class="clRadio" value="e">E) </label></br>
                                    </div>
                                </div>
                            </div>`
                                
                        for(let j = 0; j < 5; j++){
                            txAlternativas = document.getElementsByClassName('lbAlternativas')[j]
                            txAlternativas.innerHTML += alternativas[j]
                        }
                        
            break
            
        }

    }

    let saida = document.getElementsByClassName('saida')[i-1]
    saida.innerHTML +=  `<div id="controls">
                            <input type="button" value="Nova Questão" class="btControl" id="btNovaQuestao">
                            <input type="button" value="Confirmar" class="btControl" id="btConfirmar" onclick="corrigir()">
                        </div>`
}

function corrigir(){
    let respostas = []
    let gabarito = ['PEDRO', 'D']
    let corretas = 0
    let erradas = 0

    respostas[0] = (document.getElementsByClassName('inputResposta')[0].value)
    //respostas[1] = (document.getElementsByClassName('clRadio')[3].value) 
    //BUSCAR VALOR DO RADIO BUTTON SABENDO SE ESTÁ MARCADO OU NÃO
    

    for(let i = 0; i < respostas.length; i++){
        respostas[i] = respostas[i].toUpperCase()
    }

    for(let i = 0; i < 2; i++){
        if(respostas[i] == gabarito[i]){
            corretas += 1
        }else{
            erradas +=1
        }
    }


    window.alert(`Você acertou ${corretas} questões e errou ${erradas}`)
}










// TENTATIVA DE FAZER COM POO
/* function questao(){
    let enunciado = 'none'
    let resposta = 'none'
    function constructor(enun, resp){
        this.enunciado = enun
        this.resposta = resp
    }
}


function apresentarQuestoes(){
    let q1 = new questao()
    q1.constructor('Quem descobriu o Brasil?', 'Pedro Alves Cabral')
    window.alert(q1.resposta)
} */