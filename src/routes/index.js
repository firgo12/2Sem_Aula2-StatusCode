const express = require ('express')
const router = new express.Router()

//Ponto de acesso de get
//Retonar status 200 OK
router.get('/', (req, res, next) => {
    res.status(200).send(
        {
            "nome" : "Guilherme Cunha"
        }
    )
})

//401 Unauthorized
router.get("/privada", (req, res) => {
    const token = req.headers['authorization'];

    if(!token || token !== 'minhaSenha'){
        return res.status(410).send('Sem autorização!')
    }

    res.send('Area acessada com sucesso!').status(200)
})

const tokenExemplos ={
    'tokenAdmin' : {role: 'admin'},
    'tokenUser' : {role: 'user'},
    'tokenConvidado' : {role: 'convidado'}
}

router.get('/admin', (req, res)=>{
    const token = req.headers["authorization"]

    if(!token){
        return res.status(401).send('Sem autorização')
    }

    //Validando se é um usuário ok
    const user = tokenExemplos[token]
    if(!user){
        return res.status(401).send('Token inválido')
    }

    if(user.role != 'admin'){
        return res.status(403).send('Você não tem permissão para acessar aqui')
    }
    return res.send('Acesso liberado!').status(200)
})

//Exemplo bad request - 400
router.post('/submit', (req, res) => {
    const {nome, email} = req.body;

    if(!nome || !email){
        return res.status(400).send('Bad request... Favor enviar nome e e-mail')
    }

    //status 201 created
    res.send('Dado criado com sucesso!').status(201);
})

//status 404
let items = [
    {id: 1, nome: 'item1'},
    {id: 2, nome: 'item2'},
    {id: 3, nome: 'item3'},
    {id: 4, nome: 'item4'}
]

router.get("/items/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const item = items.find(item => item.id == id)

    if (item){
        return res.status(200).send(item)
    } else {
        return res.status(404).send("Item não encontrado")
    }
})

module.exports = router;