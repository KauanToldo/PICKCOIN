// DECLARAÇÃO DE VARIAVEIS DOM

var gameContainer = document.querySelector("#game")
var configBtn = document.querySelector("#config")
var soundBtn = document.querySelector("#sound")
var musicBtn = document.querySelector("#music")
var play = document.querySelector("#play")
var contagem = document.querySelector("#contagem")
var wallet = document.querySelector("#wallet")
var configBtnPause = document.querySelector("#config-pause")
var soundBtnPause = document.querySelector("#sound-pause")
var musicBtnPause = document.querySelector("#music-pause")
var desistir = document.querySelector("#desistir")
var continuar = document.querySelector("#continuar")
var pause = document.querySelector("#pause-modal")
var pausarBtn = document.querySelector("#pause")
let alturaPai = wallet.parentElement.offsetHeight;
let larguraPai = wallet.parentElement.offsetWidth;



var coins = []
var typeCoins = ["bitcoin", "tether", "binance", "ethereum", "um_real", "meio_real"]
var topValue = 10

window.onresize = () => {
    alturaPai = wallet.parentElement.offsetHeight;
    larguraPai = wallet.parentElement.offsetWidth;
}


let tempoRestante = 3;
let game = false

// EVENTO DE CLICK NOS BOTÕES DE CONFIGURAÇÔES

configBtn.addEventListener("click", () => {
    soundBtn.classList.toggle("abertoSound")
    musicBtn.classList.toggle("abertoMusic")
    soundBtn.classList.toggle("fechado")
    musicBtn.classList.toggle("fechado")
})

soundBtn.addEventListener("click", () => {
    var tagBtn = soundBtn.getElementsByTagName('i')[0]
    if (tagBtn.classList.contains('fa-solid') && tagBtn.classList.contains('fa-volume-xmark')) {
        soundBtn.innerHTML = "<i class='fa-solid fa-volume-high'></i>"
    }
    else {
        soundBtn.innerHTML = "<i class='fa-solid fa-volume-xmark'></i>"
    }
})

musicBtn.addEventListener("click", () => {
    var tagBtn = document.querySelector("#music-icon")
    if (tagBtn.classList.contains('ligado')) {
        musicBtn.innerHTML = "<span id='music-icon' class='material-symbols-outlined'>music_off</span>"
    }
    else {
        musicBtn.innerHTML = "<span id='music-icon' class='material-symbols-outlined ligado'>music_note</span>"
    }
})

configBtnPause.addEventListener("click", () => {
    soundBtnPause.classList.toggle("abertoSoundPause")
    musicBtnPause.classList.toggle("abertoMusicPause")
    soundBtnPause.classList.toggle("fechadoPause")
    musicBtnPause.classList.toggle("fechadoPause")
})

soundBtnPause.addEventListener("click", () => {
    var tagBtn = soundBtnPause.getElementsByTagName('i')[0]
    if (tagBtn.classList.contains('fa-solid') && tagBtn.classList.contains('fa-volume-xmark')) {
        soundBtnPause.innerHTML = "<i class='fa-solid fa-volume-high'></i>"
    }
    else {
        soundBtnPause.innerHTML = "<i class='fa-solid fa-volume-xmark'></i>"
    }
})

musicBtnPause.addEventListener("click", () => {

    var musicIconPause = document.querySelector("#music-icon-pause")
    var musicBtnPause = document.querySelector("#music-pause")
    if (musicIconPause.classList.contains('ligado-pause')) {

        musicBtnPause.innerHTML = "<span id='music-icon-pause' class='material-symbols-outlined'>music_off</span>"
    }
    else {
        musicBtnPause.innerHTML = "<span id='music-icon-pause' class='material-symbols-outlined ligado-pause'>music_note</span>"
    }
})

// EVENTO CLICK NOS BOTÔES Jogar/Pausar/Desistir/Continuar

play.addEventListener("click", () => {
    window.location.href = "#game"
    setTimeout(atualizarContador() ,2000);
})

desistir.addEventListener("click", () => {
    window.location.href = "#home"
    pause.style = "display: none"
    game = false
})

continuar.addEventListener("click", () => {
    pause.style = "display: none"
    atualizarContador()
})

pausarBtn.addEventListener("click", () => {
    pause.style = "display: flex"
    game = false
})

// Contagem regressiva

function atualizarContador() {
  if (tempoRestante == 0) {
    contagem.style.display = 'none';
    game = true
    tempoRestante = 3
    return;
    }
  contagem.style = "display: block"
  contagem.innerHTML = tempoRestante;
  tempoRestante--;
  setTimeout(atualizarContador, 2000);
}

// Movimentando a carteira/PC

function verificarTeclaPressionada(event) {
  const tecla = event.key;
  const larguraPai = wallet.parentElement.offsetWidth;
  if (tecla === 'd' || tecla === 'D') {
    const estiloComputado = getComputedStyle(wallet);
    const posicaoPorcentagemLeft = parseFloat(estiloComputado.getPropertyValue('left'));
    const posicaoPorcentagemRight = parseFloat(estiloComputado.getPropertyValue('right'));
    if ((posicaoPorcentagemLeft + 40) >= larguraPai || posicaoPorcentagemLeft < 0) {
        return
    }
    wallet.style.left = (posicaoPorcentagemLeft + 15) + 'px';
  }
  if (tecla === 'a' || tecla === 'A') {
    const estiloComputado = getComputedStyle(wallet);
    const posicaoPorcentagemLeft = parseFloat(estiloComputado.getPropertyValue('left'));
    const posicaoPorcentagemRight = parseFloat(estiloComputado.getPropertyValue('right'));
    if ((posicaoPorcentagemRight) > larguraPai || (posicaoPorcentagemLeft - 37.5) <= 0) {
        return
    }
    wallet.style.left = (posicaoPorcentagemLeft - 15) + 'px';
  }
}

// Jogo rodando

var gamePlayedVerification = setInterval(function() {
    // Verificar o valor da variável
    if (game) {
        document.addEventListener('keydown', verificarTeclaPressionada);
    } else {
      document.removeEventListener('keydown', verificarTeclaPressionada);
    }
}, 10);

function adicionarMoeda() {
  var indiceSorteado = Math.floor(Math.random() * typeCoins.length);
  var coinSorteado = typeCoins[indiceSorteado];

  const coin = document.createElement("img");
  coin.setAttribute("src", `img/criptocoins/${coinSorteado}.svg`);
  coins.push(coin);

  let positionCoin = Math.floor(Math.random() * (larguraPai - 32.5));
  coin.style.cssText = `width: 45px; height: 45px; position: absolute; left: ${positionCoin}px`;
  gameContainer.appendChild(coin);

  console.log(coins);
}

function sortearCoin() {
  var indiceSorteado = Math.floor(Math.random() * coins.length);
  var coinSorteado = coins[indiceSorteado];
  return coinSorteado;
}

function criarMoeda(coinAleatorio) {
  const coin = document.createElement("img");
  coin.setAttribute("src", `img/criptocoins/${coinAleatorio}.svg`);
  coins.push(coin);
  console.log(coin);
}

function mostrarMoeda() {
  for (let coin of coins) {
    let positionCoin = Math.floor(Math.random() * (larguraPai - 32.5));
    coin.style.cssText = `width: 45px; height: 45px; position: absolute; left: ${positionCoin}px`;
    gameContainer.appendChild(coin);
  }
}





// function adicionarMoeda() {
//     var indiceSorteado = [Math.floor(Math.random() * typeCoins.length)];
//     var coinSorteado = typeCoins[indiceSorteado]
//     const coin = document.createElement("img")
//     coin.setAttribute("src", `img/criptocoins/${coinSorteado}.svg`);
//     coins.push(coin)
//     let positionCoin = Math.floor(Math.random() * (larguraPai - 32.5))
//     coin.style = `width: 45px; height: 45px; position: absolute; left: ${positionCoin}px`
//     gameContainer.appendChild(coin)
//     console.log(coins)
// }

// function sortearCoin() {
//     typeCoins = ["bitcoin", "tether", "binance", "ethereum", "um_real", "meio_real"]
//     var indiceSorteado = [Math.floor(Math.random() * coins.length)];
//     var coinSorteado = coins[indiceSorteado]
//     return coinSorteado
    
// }

// function criarMoeda(coinAleatorio) {
//     const coin = document.createElement("img")
//     coin.setAttribute("src", `img/criptocoins/${coinAleatorio}.svg`);
//     coins.push(coin)
//     console.log(coin)
// }

// function mostrarMoeda() {
//     for (coin in coins) {
//         let positionCoin = Math.floor(Math.random() * (larguraPai - 32.5))
//         coin.style = `width: 45px; height: 45px; position: absolute; left: ${positionCoin}px`
//         gameContainer.appendChild(coin)
//     }
// }

// function cairMoeda(coinElement) {
//         coinElement.style.top = (topValue + .5) + "px";
//     if ((topValue + 20) >= (alturaPai - 100)) {
//         coinElement.style = "display:none"
//     }
// }

// Moedas Caindo Aleatoriamente

// class Coin {
//     constructor() {
//         this.x = Math.floor(Math.random() * (larguraPai - 32.5))
//         this.y = 30
//         let coins = ["bitcoin", "tether", "binance", "ethereum", "um_real", "meio_real"]
//         let indiceSorteado = [Math.floor(Math.random() * coins.length)];
//         this.coinSorteado = coins[indiceSorteado]

//         this.spawnar = () => {
//             let coin = document.createElement("img")
//             coin.setAttribute("src", `img/criptocoins/${this.coinSorteado}.svg`);
//             coin.style = `width: 45px; height: 45px; position: absolute; left: ${this.x}px`
//             gameContainer.appendChild(coin)
//             this.coinObject = coin
//         }

//         this.spawnar()

//         this.descerMoeda = () => {
//             this.coinObject.style.top = (this.y + 5) + "px";
//         }

//         this.verifyToqueChao = () => {
//             return ((this.y + 20) >= (alturaPai - 100)) 
//         }

//         this.toqueChao = () => {
//             this.coinObject.style.display = "none"
//             delete this
//         }

//         setInterval(() => {
//             if (this.verifyToqueChao()) {
//                 this.toqueChao()
//             }
//         }, 10)

//     }
// }

// setInterval(() => {
//     for (let coin in coins) {
//         coin.descerMoeda()
//     }
// },80)






// aaaaa


class Coin {
    constructor() {
        this.x = Math.floor(Math.random() * (larguraPai - 32.5));
        this.y = 30;
        let indiceSorteado = Math.floor(Math.random() * coins.length);
        this.coinSorteado = coins[indiceSorteado];

        this.coinObject = document.createElement("img");
        this.coinObject.setAttribute("src", `img/criptocoins/${this.coinSorteado}.svg`);
        this.coinObject.style = `width: 45px; height: 45px; position: absolute; left: ${this.x}px`;
        gameContainer.appendChild(this.coinObject);

        setInterval(() => {
            this.descerMoeda();
            if (this.verifyToqueChao()) {
                this.toqueChao();
            }
        }, 80);
    }

    descerMoeda() {
        this.coinObject.style.top = (this.y + 5) + "px";
    }

    verifyToqueChao() {
        return (this.y + 20) >= (alturaPai - 100);
    }

    toqueChao() {
        this.coinObject.style.display = "none";
        delete this;
    }
}

setInterval(() => {
    for (let coin of coins) {
        coin.descerMoeda();
    }
}, 80);

