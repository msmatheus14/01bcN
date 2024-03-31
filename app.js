const express = require ('express')
const app = express()
app.use(express.urlencoded({ extended: true }));
const porta = 3000

app.use(express.static('public'))
app.set('view engine', 'ejs')


const vagas = []

function adicionarVaga(id,titulo,conhecimentos,remuneracao,beneficios,status){
    let vaga = {

        id:id,
        titulo:titulo,
        conhecimentos:conhecimentos,
        remuneracao:remuneracao,
        beneficios:beneficios,
        status:status
    }

    vagas.push(vaga)
}

adicionarVaga(1, "Desenvolvedor Frontend", ["HTML", "CSS", "JavaScript"], 5000, ["Plano de saúde", "Vale refeição"], "ativo");

adicionarVaga(2, "Desenvolvedor Backend", ["Node.js", "Express", "MongoDB"], 6000, ["Plano de saúde", "Vale alimentação"], "ativo");

adicionarVaga(3, "Analista de Dados", ["SQL", "Python", "Machine Learning"], 7000, ["Plano de saúde", "Bônus anual"], "ativo");


app.get('/vagas', (req,res) => {
    res.render('index', {vagas: vagas})
})

app.get('/vagas/:id', (req,res) => {

    const id = parseInt (req.params.id)
    const vaga = vagas.find(vaga => vaga.id === id)

    if(!vaga) {

        res.status(404).send('<img src="https://images.emojiterra.com/twitter/512px/1f641.png">');

    }
    else
    {
        res.status(200)
        res.render('vaga', {vaga: vaga})
    }

    
})

app.get('/criar-vaga', (req, res) => {

    res.render('criarvaga');
});


app.post('/criar-vaga', (req, res) => {
    const { id, titulo, conhecimentos, remuneracao, beneficios, status } = req.body

    adicionarVaga(id, titulo, conhecimentos.split(','), remuneracao, beneficios.split(','), status);

    res.redirect('/vagas');
    
});

app.listen(porta, ()=> {

    console.log('Servidor rodando na porta 3000')
})

app.get('/atualizar-vaga', (req, res) => {

    res.render('atualizarvaga');
});

function atualizarvaga(id, titulo, conhecimentos, remuneracao, beneficios, status)
 {
    let encontrado = false

    for (let i = 0; i < vagas.length; i++)
     {
        if (vagas[i].id == parseInt(id)) {

            encontrado = true
            
            vagas[i].titulo = titulo;
            vagas[i].conhecimentos = conhecimentos.split(', ');
            vagas[i].remuneracao = remuneracao;
            vagas[i].beneficios = beneficios.split(', ');
            vagas[i].status = status;

            

            break;
        }
    }
    
    if(encontrado == false)
    {
        return false
    }else
    {
        return true
    }
}


app.put('/atualizar-vaga', (req, res) => {

    const { id, titulo, conhecimentos, remuneracao, beneficios, status } = req.body;
     if(atualizarvaga(id, titulo, conhecimentos, remuneracao, beneficios, status))
     {

     }
     else
     {
        res.status(404).send('Valor não encontrado amigo')
     }

    res.redirect('/vagas');

});




 