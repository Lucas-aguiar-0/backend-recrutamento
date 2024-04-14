import express from 'express';
import CandidatoCadastro from './Modelo/Candidato.js';
import rotacandidato from './Rota/rotacandidato.js';
import cors from 'cors'



const port = 4000;
const host = '0.0.0.0';
const app = express();
app.use(cors());

app.use(express.urlencoded({extended:true}));

app.use(express.static('./Publico'));
app.use(express.static('./candidatos'));


//manipular objetos em json
app.use(express.json());
app.use('/candidatos',rotacandidato);



app.listen(port,host, () =>
{ //string literals javascript '   '
    console.log(`Servidor rodando em http://${host}:${port}`);
});
