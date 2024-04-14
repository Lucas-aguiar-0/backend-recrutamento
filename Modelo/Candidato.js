import CandidatoBD from "../Persistencia/CandidatoBD.js";

export default class CandidatoCadastro{
    #cpf
    #nome
    #numctps
    #serie
    #dtnasc
    #rg

    constructor(cpf, nome, numctps, serie, dtnasc, rg){
        this.#cpf = cpf;
        this.#nome = nome;
        this.#numctps = numctps;
        this.#serie = serie;
        this.#dtnasc = dtnasc;
        this.#rg = rg;
    }

    get cpf(){
        return this.#cpf;
    }

    set cpf(novoCpf){
        this.#cpf = novoCpf;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        if (novoNome != "")
            this.#nome = novoNome;
        else
            console.log('Por favor preencha o nome do candidato!');
    }

    get numctps(){
        return this.#numctps;
    }

    set numctps(novoNumctps){
        this.#numctps = novoNumctps;
    }

    get serie(){
        return this.#serie;
    }

    set serie(novaSerie){
        this.#serie = novaSerie;
    }

    get dtnasc(){
        return this.#dtnasc;
    }

    set dtnasc(novaDtnasc){
        this.#dtnasc = novaDtnasc;
    }

    get rg(){
        return this.#rg;
    }

    set rg(novoRg){
        this.#rg = novoRg;
    }

    toJSON(){
        return{
            'cpf'      : this.#cpf,
            'nome'     : this.#nome,
            'numctps'  : this.#numctps,
            'serie'    : this.#serie,
            'dtnasc'   : this.#dtnasc,
            'rg'       : this.#rg
            }
        }
    


    async gravar(){
        const candidatoBD = new CandidatoBD();
        await candidatoBD.incluir(this);
    }

    async excluirdobanco(){
        const candidatoBD = new CandidatoBD;
        await candidatoBD.excluir(this);
    }

    async consultar(termo){
        const candidatoBD = new CandidatoBD();
        const candidatos = await candidatoBD.consultar(termo);
        return candidatos;
    }

    async consultarCPF(cpf){
        const candidatoBD = new CandidatoBD();
        const candidatos = await candidatoBD.consultarCPF(termo);
        return candidatos;
    }

    async consultartudo(){
        const candidatoBD = new CandidatoBD();
        const candidatos = await candidatoBD.consultartudo();
        return candidatos;
    }


}

