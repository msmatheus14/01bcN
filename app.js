
//Professor ao testar as requições da API no postman, favor use x-www-form-urlencoded


const express = require('express')
const app = express()
const porta = 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.set('view engine', 'ejs')


const vagas = []




app.get('/vagas', (req,res) => {
    res.render('index', {vagas: vagas})
})


app.get('/vagas/:id', (req,res) => {

    const id = parseInt (req.params.id)
    let vaga = 0
    
    for(let i = 0; i< vagas.length;i++){
        if(vagas[i].id == id){
            vaga = vagas[i]
        }
    }

    res.render("vaga-busca", {vaga:vaga})

    
})


app.post('/vagas', (req, res) => {

    const { id, titulo, conhecimentos, remuneracao, beneficios, status } = req.body
let output = {
    id: id,
    titulo:titulo,
    conhecimentos: conhecimentos,
    remuneracao: remuneracao,
    beneficios: beneficios, 
    status: status
}

    if(adicionarVaga(id, titulo, conhecimentos, remuneracao, beneficios,status))
    {
        res.status(200)
        res.render('vaga-adicionada', {vaga: output})
    }
    else{

        res.status(500)
    }
    

    
});



function adicionarVaga(id,titulo,conhecimentos,remuneracao,beneficios,status){

    let vaga = {
        
        id:id,
        titulo:titulo,
        conhecimentos:conhecimentos,
        remuneracao:remuneracao,
        beneficios:beneficios,
        status:status
    }
    
    if(vagas.push(vaga)){
        return true
    }else
    {
        return false
    }
}


app.put('/vagas', (req, res) => {

    const { id, titulo, conhecimentos, remuneracao, beneficios, status } = req.body;

    let output = {

        id:id, 
        titulo: titulo,
        conhecimentos: conhecimentos,
        remuneracao: remuneracao,
        beneficios: beneficios,
        status: status
    }
    
    console.log(id)

     if(atualizarvaga(id, titulo, conhecimentos, remuneracao, beneficios, status))
     {
        res.status(200)
        res.render('vaga-atualizada', {vaga:output})
     }
     else
     {
        res.status(404)
        res.send('<h1>ERROR 404, NOT FOUND!</h1>')
        
     }
     
});

function atualizarvaga(id, titulo, conhecimentos, remuneracao, beneficios, status)
{
    let encontrado = false

    for (let i = 0; i < vagas.length; i++)
    {
        if (vagas[i].id == parseInt(id)) {

            encontrado = true
            
            vagas[i].titulo = titulo;
            vagas[i].conhecimentos = conhecimentos;
            vagas[i].remuneracao = remuneracao;
            vagas[i].beneficios = beneficios;
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



app.delete('/vagas', (req,res) => {
    const id = req.query.id
    let encontrado = false

    let vagaExcluida = []


   for(let i = 0; i < vagas.length; i++){

        if(vagas[i].id == parseInt(id)){

            vagaExcluida.push(vagas[i])
            vagas.splice(i,1)
            encontrado = true
            
        }
    }

    
    if(encontrado == true){
    res.status(200)
    res.render('vaga-excluida', {vagas:vagaExcluida})
    }
    else
    {
        res.status(404)
        res.send('<h1>VALOR NÃO ENCONTRADO</h1>')
    }
    
})


app.listen(porta, ()=> {

    console.log('Servidor rodando na porta 3000')
})
