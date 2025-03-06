
//lista de palavras
const palavras = ['LittleBigPlanet','Colecionador','Lua','Controle','Criatividade','PlayStation','Imaginacao']//a lista de palavras que o jogo vai gerar 
let palavraSecreta = '';//variavel para armazenar a palavra secreta 
let letrasCorretas = []//array para armazenar as letras corretas que o jogador adivinhar
let letrasErradas = []//arrays para armazenar as letras incorretas que o jovem jogador tentar
let tentativas = 5;//o numero de tentaivas iniciais que o jogadoe tentara em sua exímia sabedoria
let numeroDeLetras = 0;//variavel para armazenar o numero de letras na palavra secreta

//funcao para escolher ima palavra aleatoria da lista

function escolherPalavra() {
    const indice = Math.floor(Math.random() * palavras.length)//entao aqui se escolhe um indice aleatorio da lista de palavras
    palavraSecreta = palavras[indice]//aqui a palavra secreta é escolhida
    //contando o numero de letras de letras da palavra
    numeroDeLetras = palavraSecreta.replace(/ /g, '').length//conta apenas as letras, sem contar os espaços
    // substitui os espaços da palvra por hifens para visualização
    let palavraComHifen = palavraSecreta.replace(/ /g, '-')
    letrasCorretas = Array(palavraComHifen.length).fill('_')//inicializa o attau de letras corretas com '_'

    letrasIncorretas = [];//reinicia o array de letras incorretas
    tentativas = 5//reinicia as tentativas com 5 chances pq o pessoal é muito bom

    atualizarPalavra()//atualiza a visualização da palavra secreta
    atualizarErros()//atualiza a vizualização do numero de tentativas restantes
    document.getElementById('mensagem').textContent = ''//limpa qualquer mensagem na tela

    document.getElementById('imagem-acerto').style.display = 'none'//esconde a imagem de acerto
    document.getElementById('imagem-erro').style.display = 'none'//esconde a imagem de erro
    document.getElementById('imagem-acerto2').style.display = 'none'
    document.getElementById('imagem-erro2').style.display = 'none'

    document.getElementById('tentativas-contagem').textContent = tentativas//exibe o numero de tentativas restantes

    document.getElementById('numero-letras').textContent = `Numero de letras:${numeroDeLetras}`
}

function atualizarPalavra() {
    let palavraExibida = ''//inicializa um =a varuavel para a palavra exibida

    //itera sobre a palavra secreta e revela as letras corretas deixando espaços ou hyfens

    for (let i = 0; i < palavraSecreta.length; i++) {
        if (letrasCorretas[i] === '_') {
            if (palavraSecreta[i] === '-') {
                palavraExibida += '-'//se for um hyfen ou mantem o hifen visivel
            } else if (palavraSecreta[i] === ' ') {
                palavraExibida += ' '//seja0 mantem um traço(0u undernile, segundo o Gabsssssssssssssss) indicando uma letra não NÃ0 adivinhada
            } else {
                palavraExibida += "_"//senao mantem um traço na letra nao adivinhada
            }
        } else {
            palavraExibida += letrasCorretas[i];
        }
    }
    document.getElementById('palavra-secreta').textContent = palavraExibida.trim()//remove o ultimo espaço extra
}

function verificaLetra() {
    const letra = document.getElementById('letra').value.toLowerCase();//obtem a letra digitada e converte para minuscula

    //verifica se a letra nao foi tentada antes e se nao é uma letra vazia
    if (letra && !letrasErradas.includes(letra) && !letrasCorretas.includes(letra)) {
        if (palavraSecreta.toLowerCase().includes(letra)) {
            for (let i = 0; i < palavraSecreta.length; i++) {
                if (palavraSecreta[i].toLocaleLowerCase() === letra) {
                    if (palavraSecreta[i] === letra.toUpperCase()) {
                        letrasCorretas[i] = letra.toUpperCase()
                    }
                    else {
                        letrasCorretas[i] = letra
                    }
                }
            }
            document.getElementById('mensagem').textContent = `Você acertou a letra: ${letra}`//eixbe a mensagem de acert0
            document.getElementById('mensagem').style.color = 'green'//aki deixa a mensagem verde

            if (20 === Math.floor(Math.random() * 20 + 1)) {
                document.getElementById('imagem-acerto2').style.display = 'block'
                document.getElementById('imagem-acerto').style.display = 'none'
                document.getElementById('imagem-erro').style.display = 'none'
                document.getElementById('imagem-erro2').style.display = 'none'
            } else {
                document.getElementById('imagem-erro').style.display = 'none'
                document.getElementById('imagem-acerto').style.display = 'block'
                document.getElementById('imagem-erro2').style.display = 'none'
                document.getElementById('imagem-acerto2').style.display = 'none'
            }

        } else {
            letrasErradas.push(letra)
            tentativas--
            document.getElementById('mensagem').textContent = `Letra Errada: ${letra}`
            document.getElementById('mensagem').style.color = 'Red'

            if (20 === Math.floor(Math.random() * 20 + 1)) {
                document.getElementById('imagem-acerto2').style.display = 'none'
                document.getElementById('imagem-acerto').style.display = 'none'
                document.getElementById('imagem-erro').style.display = 'block'
                document.getElementById('imagem-erro2').style.display = 'none'
            } else {
                document.getElementById('imagem-erro').style.display = 'none'
                document.getElementById('imagem-acerto').style.display = 'none'
                document.getElementById('imagem-erro2').style.display = 'block'
                document.getElementById('imagem-acerto2').style.display = 'none'
            }
        }

        document.getElementById('letra').value = ''; // Limpa a caixa de entrada após o chute
        atualizarPalavra(); // Atualiza a visualização da palavra secreta
        atualizarErros(); // Atualiza o número de tentativas restantes

        if (letrasCorretas.join('') === palavraSecreta.replace(/ /g, '-')) {
            document.getElementById('mensagem').textContent = `Você ganhou! A palavra era: ${palavraSecreta}`; // Exibe a mensagem de vitória
            document.getElementById('mensagem').style.color = 'green'; // A mensagem fica verde
        } else if (tentativas <= 0) {
            document.getElementById('mensagem').textContent = `Você perdeu! A palavra era: ${palavraSecreta}`; // Exibe a mensagem de derrota
            document.getElementById('mensagem').style.color = 'red'; // A mensagem fica vermelha
        }
    }
}


// Função para atualizar a contagem de tentativas restantes
function atualizarErros() {
    document.getElementById('tentativas-contagem').textContent = tentativas; // Atualiza a contagem de tentativas
}

// Função para reiniciar o jogo
function reiniciarJogo() {

    letrasErradas=[]
    letrasCorretas=[]

    escolherPalavra(); // Escolhe uma nova palavra
    document.getElementById('mensagem').textContent = ''; // Limpa qualquer mensagem existente

}

function verificaPalavra(){
        const guess=document.getElementById('guess').value.toLowerCase()
    if(palavraSecreta.toLowerCase()===guess){
        for(let i=0;i<palavraSecreta.length;i++){
            letrasCorretas[i]=palavraSecreta[i]
        }
        }else{
        tentativas--
    }

    atualizarErros()
    atualizarPalavra()

    if (letrasCorretas.join('') === palavraSecreta.replace(/ /g, '-')) {
        document.getElementById('mensagem').textContent = `Você ganhou! A palavra era: ${palavraSecreta}`; // Exibe a mensagem de vitória
        document.getElementById('mensagem').style.color = 'green'; // A mensagem fica verde
    } else if (tentativas <= 0) {
        document.getElementById('mensagem').textContent = `Você perdeu! A palavra era: ${palavraSecreta}`; // Exibe a mensagem de derrota
        document.getElementById('mensagem').style.color = 'red'; // A mensagem fica vermelha
    }
    document.getElementById('guess').value=''
}

// Inicia o jogo chamando a função escolherPalavra
escolherPalavra();



