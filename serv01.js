const http = require('http')

const host = 'localhost'
const porta = 8080

const resposta = function (req,res){
    res.writeHead(200)
    res.end('Meu primeiro servidor!')
}

const server = http.createServer(resposta)

server.listen(porta,host,function(){
    console.log('O servidor esta sendo execultado corretamento!')
})