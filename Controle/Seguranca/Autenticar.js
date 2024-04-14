export default function autenticar(requisicao, resposta, next){
const usuario = 'teste1';
const senha = '123456';

const usuarioinformado = requisicao.body.usuario;
const senhainformada = requisicao.body.senha;

if (usuarioinformado === usuario && senhainformada === senha){

    requisicao.session.autenticado = true;
    resposta.redirect('/cadastroCandidatos.html');

}
else{
    requisicao.session.autenticado = false;
    resposta.redirect('/login.html');
}

}

export function logado(requisicao, resposta, next){
    if(requisicao.session.autenticado){
        next();
    }

    else{
        resposta.redirect('/login.html');
    }
}