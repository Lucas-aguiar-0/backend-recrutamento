import CandidatoCadastro from "../Modelo/Candidato.js"
export default class DadosCandidatos {
    gravar(requisicao, resposta){
        resposta.type('aplication/json')
        if(requisicao.method ==='POST'){
            const dados = requisicao.body
            const cpf   = dados.cpf
            const nome  = dados.nome
            const numctps = dados.numctps
            const serie = dados.serie
            const dtnasc = dados.dtnasc
            const rg = dados.rg
            if(cpf && nome && numctps && serie && dtnasc && rg){
                const candidato = new CandidatoCadastro(cpf, nome, numctps, serie, dtnasc, rg);
                candidato.gravar().then(() => {
                    resposta.json({
                        status:true,
                        mensagem:"Cadastro realizado com sucesso"
                    });
                }).catch((erro) => {
                    resposta.json({
                        status:false,
                        mensagem:"Não foi posivel cadastrar:" + erro.message
                });
                });
            }
            else{
                resposta.json({
                        status:false,
                        mensagem:"preencha todos os campos corretamente"
                });
            }
            
        }
    
    
        else{
            resposta.json({
                status:false,
                mensagem:"Metodo HTTP invalido"
        });
        }

    }
    
    excluir(requisicao, resposta){
        { resposta.type('aplication/json')
            if(requisicao.method ==='DELETE' ){
                const dados = requisicao.body
                const cpf = dados.cpf
                console.log(cpf); 
                if(cpf){
                    const candidato = new CandidatoCadastro(cpf);
                    candidato.excluirdobanco().then(() => {
                        resposta.json({
                            status:true,
                            mensagem:"Cadastro excluido com sucesso!"
                        })
                    }).catch((erro) => {
                        resposta.json({
                            status:false,
                            mensagem:"nao foi posivel excluir o usuario:" + erro.message
                    });
                    });
                }
                else{
                    resposta.json({
                            status:false,
                            mensagem:"preencha todos os campos corretamente"
                    });
                }
                
            }
            else{
                resposta.json({
                    status:false,
                    mensagem:"Metodo HTTP invalido"
            });
            }
        }

    }
    consultartudo(requisicao, resposta){    
         resposta.type('aplication/json')
            if(requisicao.method ==='GET'  ){
                const candidato = new CandidatoCadastro();
                candidato.consultartudo().then((listaCandidatos) => {
                        resposta.json(listaCandidatos)
                    }).catch((erro) => {
                        resposta.json({
                            status:false,
                            mensagem:"nao foi posivel buscar:" + erro.message
                    })                  })
                }    
            else{
                resposta.json({
                    status:false,
                    mensagem:"Metodo HTTP invalido"
                    });     
    
                }
        
    
    }
}
