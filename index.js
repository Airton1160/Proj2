//criando servidor com Express, aqui esta importando ele
//IMPORTS
const express = require('express')

//criando uma nova aplicacao com Express
const app = express()

//para app rodar qdo postar'*detalhes dps*'
const path = require('path')
const convert = require('./lib/convert')

//setando o view-engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
//lugar para guardar as coisas exx. css etc
app.use(express.static(path.join(__dirname, 'public')))
//renderizando apenas 1 pagina home

//Criacao de paginas
app.get('/', (req, res) => {
    res.render('home')
})
//aqui configuracao pronta de uma pagina
app.get('/cotacao', (req, res) => {
    const { cotacao, quantidade } = req.query
    if (cotacao && quantidade) {
        const conversao = convert.convert(cotacao, quantidade)
        res.render('cotacao', {
            error: false,
            cotacao: convert.toMoney(cotacao),
            quantidade: convert.toMoney(quantidade),
            conversao: convert.toMoney(conversao)
        })
    } else {
        res.render('cotacao', {
            error: 'Valores Inválidos'
        })
    }
})

//ouvir a aplicacao na porta selec.
app.listen(3000, err => {
    if (err) {
        console.log('deu ruim mannn')
    } else {
        console.log('Conexao Estabelecida')
    }
})