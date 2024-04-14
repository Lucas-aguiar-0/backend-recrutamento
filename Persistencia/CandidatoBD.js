import CandidatoCadastro from '../Modelo/Candidato.js';
import conectar from './Conexao.js';
export default class CandidatoBD{
    
    async incluir(candidato) {
        if(candidato instanceof CandidatoCadastro){
            const conexao = await conectar();
            const sql ="INSERT INTO Candidato(cpf, nome, numctps, serie, dtnasc, rg) \
            VALUES(?,?,?,?,?,?)";
            const valores = [candidato.cpf, candidato.nome, candidato.numctps, candidato.serie, candidato.dtnasc, candidato.rg]
            await conexao.query(sql,valores);
        }
    }
    

    async excluir(candidato) {
        if(candidato instanceof CandidatoCadastro){
            const conexao = await conectar();
            const sql ="DELETE FROM Candidato \
            WHERE cpf = ?";
            const valores = [candidato.cpf]
            await conexao.query(sql,valores);
        }


    }


    async consultartudo() {
        const conexao = await conectar();
        const sql = "SELECT * FROM Candidato order by nome";
        const [rows] = await conexao.query(sql);
        const listaCandidatos = [];
        for (const row of rows){
            const candidato = new CandidatoCadastro(row['cpf'],row['nome'], row['numctps']);
            listaCandidatos.push(candidato);
        }
        return listaCandidatos;
    }

    async consultar(termo) {
        const conexao = await conectar();
        const sql = "SELECT * FROM Candidato where nome LIKE ?";
        const valores = ['%' + termo + '%'];
        const [rows] = await conexao.query(sql,valores);
        const listaCandidatos = [];
        for (const row of rows){
            const candidato = new CandidatoCadastro(row['cpf'],row['nome'], row['numctps']);
            listaCandidatos.push(candidato);
        }
        return listaCandidatos;
    }


    async consultarCPF(cpf){
        const conexao = await conectar();
        const sql = "SELECT * FROM Candidato where cpf = ?";
        const valores = [cpf];
        const [rows] = await conexao.query(sql,valores);
        const listaCandidatos = [];
        for (const row of rowns){
            const candidato = new CandidatoCadastro(row['cpf'],row['nome'], ['numctps']);
            listaCandidatos.push(candidato);
        }
        return listaCandidatos;



    }



}