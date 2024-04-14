import { Router } from "express";
import DadosCandidatos from "../Controle/candidatocontrole.js";


const rotacandidato = new Router();
const dadosrota = new DadosCandidatos();

rotacandidato.get('/',dadosrota.consultartudo)
.post('/',dadosrota.gravar)
.delete('/',dadosrota.excluir);
export default rotacandidato;

