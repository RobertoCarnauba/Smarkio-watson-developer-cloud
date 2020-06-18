const express = require('express')
const app = express()
const port = 8000

const bodyParser = require('body-parser')
const connection = require('./database/database')
const Comentario = require('./database/Comentario')

connection
    .authenticate()
    .then(() => {
        console.log("--> Banco conectado com sucesso");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    Comentario.findAll({
        raw: true,
        order: [['id', 'DESC']] //ASC ou DESC
    }).then((comentario => {
        res.render('index', {
            comentarios: comentario
        });
    }))
})

app.post('/salvarcomentario', (req, res) => {
    var descricao = req.body.descricao
    Comentario.create({
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    })
})

app.get('/ouvircomentario/:id', (req, res) => {


    const idcomentario = req.params.id;

    Comentario.findOne({
        where: { id: idcomentario }
    }).then(comentarios => {

        const texto = comentarios.descricao

        console.log("Comentario ou alguma coisa");
        const fs = require('fs');
        const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
        const { IamAuthenticator } = require('ibm-watson/auth');
        const textToSpeech = new TextToSpeechV1({
            authenticator: new IamAuthenticator({ apikey: 'tYA8LjdTeDM6aL7cXheXtcFk2lDdLhKr4y9uP0lhctoC' }),
            url: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/e06365c1-ac2e-441b-b16b-9f45f517c107'
        });
        const params = {
            text: texto,
            voice: 'pt-BR_IsabelaVoice', // Optional voice
            accept: 'audio/wav'
        };
        
        textToSpeech
            .synthesize(params)
            .then(response => {
                const audio = response.result;
                return textToSpeech.repairWavHeaderStream(audio);
            })
            .then(repairedFile => {
                fs.writeFileSync('./_upload/'+idcomentario+'-audio.wav', repairedFile)
                console.log('--> Texto convertido para Audio!');
            })
            .catch(err => {
                console.log(err);
            });

        textToSpeech.synthesizeUsingWebSocket(params);

    }).then(() => {
        res.redirect("/");
    })

});

app.listen(port, () => console.log('-->Rodando aplicação'));