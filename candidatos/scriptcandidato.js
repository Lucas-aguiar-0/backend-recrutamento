const endpoint = 'http://localhost:4000/candidatos';
document.addEventListener('DOMContentLoaded', function() {habilitar_botoes()
});

const botaocadastrar = document.getElementById('btcadastrar')
const botaoexcluir = document.getElementById('btexcluir')
const botaoconfirmar = document.getElementById('btconfirmar')
const botaocancelar = document.getElementById('btcancelar')

let acao = 'padrao';
botaocadastrar.onclick = () => {
    acao = 'cadastrar';
    habilitar_botoes();
}
botaoexcluir.onclick = () => {
    acao = 'excluir';
    habilitar_botoes();
    excluirCandidato();
}
botaoconfirmar.onclick = () => {
    if(validardados()){
        if (acao === 'cadastrar'){
            cadastrarcandidato();
        }  
    }
}
botaocancelar.onclick = () => {
    acao = 'padrao';
    limparformulario();
    habilitar_botoes();
}

function habilitar_botoes(){
    if (acao === 'cadastrar' || acao === 'excluir'){
        botaocadastrar.disabled = true;
        botaoexcluir.disabled = true;
        botaoconfirmar.disabled = false;
        botaocancelar.disabled = false;

    }
    else {
        limparformulario();
        trazerFormulario();
        botaocadastrar.disabled = false;
        botaoexcluir.disabled = false;
        botaoconfirmar.disabled = true;
        botaocancelar.disabled = true;
    }
}

function validardados(){
    const form = document.getElementById("register-form");
    form.classList.add("was-validated");
    if (form.checkValidity()){
        return true;
    }
    else {
        return false;
    }
}

function limparformulario(){
    const form = document.getElementById("register-form")
    form.reset();
    form.classList.remove('was-validated');
}

function cadastrarcandidato(){
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const numctps = document.getElementById('numctps').value;
    fetch(endpoint, {
        method:'POST',
        headers:{
            "Content-Type": 'application/json'
        
        },
        body: JSON.stringify({
            nome: nome,
            cpf: cpf,
            numctps: numctps
        })
    }).then((resposta) => {
        return resposta.json();    
    }).then((dados) => {
        if (dados.status){
            mostrarmensagem(dados.mensagem + ". Os dados foram registrados com sucesso");
            trazerFormulario();
            acao = 'padrao';
            habilitar_botoes();
            
        }
        else{
            mostrarmensagem(dados.mensagem)
        }
    }).catch((erro)=>{
        mostrarmensagem('Erro ao enviar a requisicao ' + erro.message)

    })
}

function mostrarmensagem(msg){
    const divmensagem=document.getElementById('mensagem')
    divmensagem.innerHTML = `
        <div class="alert alert-info" role="alert">
            ${msg}
        </div> `;
    setTimeout(()=>{
        divmensagem.innerHTML= '';
    }, 4000);
    }


function trazerFormulario(cpf="",nome="", numctps="", acao=""){
    let botaocadastrar = document.getElementById('btcadastrar');
    let botaoexcluir = document.getElementById('btexcluir');

    document.getElementById('nome').value = nome;
    document.getElementById('cpf').value = cpf;
    document.getElementById('numctps').value = numctps;

    if(acao === 'exclusao'){
        document.getElementById('cpf').disabled = true;
        botaocadastrar.disabled = true;
        botaoexcluir.disabled = false;
        
    }

    else{
            document.getElementById('cpf').disabled = false;
            botaocadastrar.disabled = false;
            botaoexcluir.disabled = true;
            
        }
}

function excluirCandidato(){
    if(confirm('Confirma a Exclusão do candidato selecionado?')){
        fetch(endpoint, {
            method:'DELETE',
            headers:{ "Content-Type": 'application/json'},
            body: JSON.stringify({
                cpf:document.getElementById('cpf').value
            })
        }).then((resposta)=>{
            if(resposta.ok) return resposta.json();
        }).then((dados)=>{
            mensagem.innerHTML="<div class='alert alert-success' role='alert'>" +
            dados.mensagem + "</div>";
            trazerFormulario();
        }).catch((erro) =>{
            mensagem.innerHTML="<div class='alert alert-danger' role='alert'>" +
            erro.message + "</div>";
        })
    }

    else{
        trazerFormulario();
    }
}
