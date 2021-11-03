const router = require('express').Router();
const Person = require('../models/Person');

//criação de dados 
router.post('/',async (req,res)=>{
    
    //req.body
    const{name,salary, approved} = req.body;

    if(!name){
       return res.status(422).json({error: "O nome é obrigatório! "});
    }

    const person = {
        name,
        salary,
        approved
    }

    //create(criar dados no banco de dados)
    try{
        await Person.create(person);
        res.status(201).json({message: 'Pessoa inserida no sistema com sucesso!'});
    }catch(error){
        res.status(500).json({error: error});
    }
});

//Read - Leitura de ados 
router.get('/', async (req,res) => {
    try{
        const people = await Person.find();
        res.status(200).json(people);
    }catch(error){
        res.status(500).json({error: error});
    }
});

//pesquisar por id 
router.get('/:id', async (req,res)=>{
    //extrair o dado da requisição = pela url = req.params
    const id = req.params.id;

    try{
        const person = await Person.findOne({_id: id});

        if(!person){
           return res.status(422).json({message: 'O usuário não foi encontrado !'});
        }

        res.status(200).json(person);
    }catch(error){
        res.status(500).json({error: error});
    }
});

//update - atualização de dados(PUT, PATCH)

//PUT - espera atualização do objeto completo
//PATCH - Atualização Parcial

router.patch('/:id', async (req,res)=>{
    const id = req.params.id;
    
    const{name, salary,approved } = req.body;
    
    const person = {
        name,
        salary,
        approved
    };

    try{

        const updatePerson = await Person.updateOne({_id: id},person);

        if(updatePerson.matchedCount === 0){
            return res.status(422).json({ message: 'O usuário não foi encontrado!' });
        }

        res.status(200).json(person);

    }catch(error){
        res.status(500).json({error: error});
    }

});

// Delete = deletar dados
router.delete('/:id', async (req, res)=>{
    
    const id = req.params.id;

    const person = await Person.findOne({_id:id});

    if(!person){
        return res.status(422).json({message: ' O usuário não foi encontrado!'});
    }   

    try{
        await Person.deleteOne({_id: id});
        res.status(200).json({message: 'Usuário removido com sucesso'});

    }catch(error){
        res.status(500).json({error: error});
    }

});



module.exports = router;