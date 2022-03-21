let seuVotoPara = document.querySelector(".d1-1 span");
let cargo = document.querySelector(".d1-2 span");
let descricao = document.querySelector(".d1-4");
let aviso = document.querySelector(".d2");
let lateral = document.querySelector(".d1-right");
let numeros = document.querySelector(".d1-3");

let etapaAtual = 0;
let numero = "";
let votoBranco = false;

function comecarEtapa() {
    let etapa = etapas[etapaAtual]
    
    let numeroHTML = "";
    numero = "";
    votoBranco = false;

    for(let i=0;i<etapa.numeros;i++) {
        if(i === 0) {
            numeroHTML += '<div class="numero pisca"></div>'
        }else {
        numeroHTML += '<div class="numero"></div>'; 
        }
    }

    seuVotoPara.style.display = "none";
    cargo.innerHTML = etapa.título;
    descricao.innerHTML = "";
    aviso.style.display = "none";
    lateral.innerHTML = "";
    numeros.innerHTML = numeroHTML;

}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero) {
            return true;
        }else {
            return false;
        }
    });
    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = "block";
        aviso.style.display = "block";
        descricao.innerHTML = ` Nome: ${candidato.nome}</br> Partido ${candidato.partido}`;

        let fotosHtml = "";
        for(let i in candidato.fotos) {
            fotosHtml += `<div class="d1-imagem"><img src="imagens/${candidato.fotos[i].url}" alt="" /> ${candidato.fotos[i].legenda} </div>`
        }
        lateral.innerHTML = fotosHtml;
    }else {
        seuVotoPara.style.display = "block";
        aviso.style.display = "block";
        descricao.innerHTML = `<div class="aviso-grande pisca">VOTO NULO</div>`
    }
    
}
function clicou(n) {
    let elNumero = document.querySelector(".numero.pisca");
    if(elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove("pisca");
        if(elNumero.nextElementSibling !== null) {
        elNumero.nextElementSibling.classList.add("pisca");
        }else {
            atualizaInterface();
        }
    }
}
function branco() {
    if(numero === "") {
        votoBranco = true;
        seuVotoPara.style.display = "block";
        aviso.style.display = "block";
        numeros.innerHTML = "";
        descricao.innerHTML = `<div class="aviso-grande pisca">VOTO EM BRANCO</div>`
    }else {
        alert("Para VOTAR em Branco você não poderá teclar nenhum número !");
    }
}
function corrigi() {
    comecarEtapa();
}
function confirmar() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;
    
    if(votoBranco === true) {
        votoConfirmado = true;
        console.log("Confirmando como BRANCO...");
    }else if(numero.length === etapa.numeros) {
        votoConfirmado = true;
        console.log("Confirmando "+numero); 
    }

    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector(".tela").innerHTML = `<div class="aviso-gigante pisca">FIM</div>`;
        }
    }
}

comecarEtapa();