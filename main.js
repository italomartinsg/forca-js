const telaInicial = document.querySelector(".container-inicial");
const formulario = document.querySelector("#form-dificuldade");
const telaSecundaria = document.querySelector(".container-secundario");
const teclado = document.querySelector(".keyboard-forca");
const btnReiniciar = document.querySelector(".reiniciar");
let dificuldadeEscolhida;
const cabecaBoneco = document.querySelector(".cabeca-boneco");
const corpoBoneco = document.querySelector(".corpo-boneco");
const bracoEsquerdoBoneco = document.querySelector(".braco-esquerdo-boneco");
const bracoDireitoBoneco = document.querySelector(".braco-direito-boneco");
const pernaEsquerdaBoneco = document.querySelector(".perna-esquerda-boneco");
const pernaDireitaBoneco = document.querySelector(".perna-direita-boneco");

const times = [
  "Flamengo",
  "Fluminense",
  "RealMadrid",
  "Barcelona",
  "Palmeiras",
  "Santos",
  "Benfica",
  "Porto",
  "PSG",
  "Bahia",
  "Fortaleza",
  "Internacional",
  "Cruzeiro",
  "Botafogo",
];
const frutas = [
  "Banana",
  "Acerola",
  "Abacaxi",
  "Caqui",
  "Framboesa",
  "Goiaba",
  "Jabuticaba",
  "Kiwi",
  "Laranja",
  "Melancia",
  "Maracuja",
  "Morango",
  "Pessego",
  "Tangerina",
];
const cores = [
  "Vermelho",
  "Azul",
  "Preto",
  "Laranja",
  "Amarelo",
  "Verde",
  "Rosa",
  "Roxo",
  "Branco",
  "Lilas",
  "Bege",
  "Ciano",
  "Magenta",
  "Marrom",
];

const paises = [
  "Brasil",
  "Holanda",
  "China",
  "Chile",
  "Peru",
  "Japão",
  "Israel",
  "Marrocos",
  "Haiti",
  "Equador",
  "Venezuela",
  "Uruguai",
  "Iraque",
  "Alemanha",
];

const animais = [
  "Cavalo",
  "Baleia",
  "Elefante",
  "Formiga",
  "Lobo",
  "Galinha",
  "Macaco",
  "Cobra",
  "Tartagura",
  "Coelho",
  "Crocodilo",
  "Girafa",
  "Gato",
  "Cachorro",
];

const palavras = [times, frutas, cores, paises, animais];
const temaForca = palavras[Math.floor(Math.random() * palavras.length)];

const palavraForca =
  temaForca[Math.floor(Math.random() * temaForca.length)].toUpperCase();

const temaHTML = document.querySelector(".dica-atual");
const palavraTela = document.querySelector(".palavra-forca");
const keyDigitadas = [];
const mostrarLetrasDigitadas = document.querySelector(".letras-digitas");
let letraPalavra;
const letraCerta = [];
const letraErrada = [];
const tentativas = document.querySelector(".tentativas-restantes");
let tentativasRestantes;

formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  dificuldadeEscolhida = document.querySelector(
    'input[name="dificuldade"]:checked'
  ).value;
  telaInicial.classList.add("removida");
  telaSecundaria.classList.add("ativo");
  iniciar(dificuldadeEscolhida);
});

function iniciar(dificuldade) {
  palavras.forEach((elemento, indice) => {
    if (elemento === temaForca) {
      if (indice === 0) {
        temaHTML.innerHTML = "Time de Futebol";
      }
      if (indice === 1) {
        temaHTML.innerHTML = "Fruta";
      }
      if (indice === 2) {
        temaHTML.innerHTML = "Cor";
      }
      if (indice === 3) {
        temaHTML.innerHTML = "País";
      }
      if (indice === 4) {
        temaHTML.innerHTML = "Animal";
      }
    }
  });
  if (dificuldade == "normal") {
    tentativasRestantes = 6;
    tentativas.textContent = tentativasRestantes;
  } else {
    tentativasRestantes = 3;
    tentativas.textContent = tentativasRestantes;
  }
  let erros = 0;

  for (let i = 0; i < palavraForca.length; i++) {
    letraPalavra = document.createElement("span");
    letraPalavra.classList.add("letraPalavra");
    letraPalavra.textContent = "_";
    letraPalavra.setAttribute("indexLetra", i);
    palavraTela.appendChild(letraPalavra);
  }
  let botoes = document.getElementsByClassName("btn");
  for (let i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener("click", receberNumeros);
  }

  function receberNumeros(e) {
    const key = e.target.getAttribute("data-key");
    e.target.setAttribute("disabled", true);

    if (keyDigitadas.indexOf(key) !== -1) {
      window.alert("voce já digitou essa letra");
    } else {
      keyDigitadas.push(key);

      mostrarLetrasDigitadas.innerHTML = keyDigitadas;

      if (palavraForca.includes(key)) {
        for (let i = 0; i < palavraForca.length; i++) {
          if (key === palavraForca[i]) {
            const letrasSpans = document.querySelectorAll(".letraPalavra");

            letrasSpans[i].textContent = key;
            letraCerta[i] = key;

            const palavraCerta = letraCerta.join("");
            if (palavraCerta == palavraForca) {
              teclado.classList.add("removida");

              const mensagemVitoria = document.createElement("h1");
              mensagemVitoria.classList.add("vitoria");
              mensagemVitoria.textContent = "Parabéns você ganhou!";
              palavraTela.appendChild(mensagemVitoria);
              btnReiniciar.classList.remove("removida");
            }
          }
        }
      } else {
        erros++;

        errou(dificuldade, erros);
      }
    }
  }

  function errou(nivelErro, numErro) {
    if (nivelErro == "normal") {
      switch (numErro) {
        case 1:
          tentativasRestantes = tentativasRestantes - 1;
          tentativas.textContent = tentativasRestantes;
          cabecaBoneco.classList.remove("removida");

          break;
        case 2:
          tentativasRestantes = tentativasRestantes - 1;
          tentativas.textContent = tentativasRestantes;
          corpoBoneco.classList.remove("removida");
          break;
        case 3:
          tentativasRestantes = tentativasRestantes - 1;
          tentativas.textContent = tentativasRestantes;
          bracoEsquerdoBoneco.classList.remove("removida");

          break;
        case 4:
          tentativasRestantes = tentativasRestantes - 1;
          tentativas.textContent = tentativasRestantes;
          bracoDireitoBoneco.classList.remove("removida");
          break;
        case 5:
          tentativasRestantes = tentativasRestantes - 1;
          tentativas.textContent = tentativasRestantes;
          pernaEsquerdaBoneco.classList.remove("removida");

          break;
        case 6:
          tentativasRestantes = tentativasRestantes - 1;
          tentativas.textContent = tentativasRestantes;
          pernaDireitaBoneco.classList.remove("removida");
          teclado.classList.add("removida");
          btnReiniciar.classList.remove("removida");
          const mensagemDerrota = document.createElement("h1");
          mensagemDerrota.classList.add("derrota");
          mensagemDerrota.textContent = "VOCE PERDEU!";
          palavraTela.appendChild(mensagemDerrota);
          break;
      }
    } else {
      switch (numErro) {
        case 1:
          tentativasRestantes = tentativasRestantes - 1;
          tentativas.textContent = tentativasRestantes;
          cabecaBoneco.classList.remove("removida");
          corpoBoneco.classList.remove("removida");

          break;
        case 2:
          tentativasRestantes = tentativasRestantes - 1;
          tentativas.textContent = tentativasRestantes;
          bracoEsquerdoBoneco.classList.remove("removida");
          bracoDireitoBoneco.classList.remove("removida");
          break;
        case 3:
          tentativasRestantes = tentativasRestantes - 1;
          tentativas.textContent = tentativasRestantes;
          pernaEsquerdaBoneco.classList.remove("removida");
          pernaDireitaBoneco.classList.remove("removida");
          btnReiniciar.classList.remove("removida");
          teclado.classList.add("removida");
          const mensagemDerrota = document.createElement("h1");
          mensagemDerrota.classList.add("derrota");
          mensagemDerrota.textContent = "VOCE PERDEU!";
          palavraTela.appendChild(mensagemDerrota);

          break;
      }
    }
  }
}

function reiniciar() {
  location.reload();
}
