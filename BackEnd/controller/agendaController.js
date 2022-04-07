const agenda = require ('../model/agenda');
const ambiente = require ('../model/ambiente');
const turma = require ('../model/turma');
const usuario = require ('../model/usuario');
const curso = require ('../model/curso');
const cursoComponente = require ('../model/cursoComponente');
const componente = require ('../model/componente');

const create = async (req, resp) => {
    const data = req.body;
    let ret = [];
    try {
        console.log(data)

        ret = await agenda.create(data);
    }catch(err) {
        console.log(err);
        resp.status(400);
    }
    resp.json(ret);
}

const read = async (req, resp) => {
    // FILTRO POR ID
    let filtro = {};
    let id = req.params.id;
    if(id != undefined) filtro = { where : {id:id}};

    filtro.include = [
        {model : ambiente},
        {model : turma, include: { model : curso, include: { model: cursoComponente, include: { model: componente }} }},
        {model : usuario, attributes: {exclude: ['foto']}},
    ]

    // FILTRO SEM ID, BUSCA TUDO NO BD
    const ret = await agenda.findAll(filtro);

    console.log("TESTE READ", ret)

    resp.json(ret);
}

const update = async (req, resp) => {
    const id = req.params.id;
    const data = req.body;
    let ret = await agenda.update(data, {
        where : {id: id},
    });
    ret = await agenda.findAll({
        where : { id : id}
    })
    resp.json(ret);
}

const remove = async (req, res) => {
    const id = req.params.id;
    const ret = await agenda.destroy ({
        where : { id : id}
    })
    if(ret == 1){
        res.json({id : id, mesage : 'Excluido com sucesso!!'});
        console.log({id : id}, "Excluido com sucesso!!")
    } else {
        res.status(400).send();
    }
}

module.exports = {
    create,
    read,
    update,
    remove,    
}