const res = require('express/lib/response');
const curso = require ('../model/curso');

const cursoComponente = require ('../model/cursoComponente');
const componente = require ('../model/componente');

const create = async (req, resp) => {
    const data = req.body;
    let ret = [];
    let index = 0;
    let comerro = false;

    console.log(data);

    const transaction = await curso.sequelize.transaction();

    try {
        await curso.create({curso:data.curso}, { transaction })
        .then(async (retCc) => {
            do {
                let temp = {
                    "id_curso": retCc.dataValues.id,
                    "id_componente": data.id_componente[index]
                }

                await cursoComponente.create(temp, {transaction})
                .then((retorno) => {
                    console.log(retorno);
                    if(index+1 === data.id_componente.length) {
                        transaction.commit();
                        resp.status(200).json(retCc);
                        comerro = true;
                    }
                })
                .catch(err => {
                    transaction.rollback();
                    resp.status(400).json({err});
                    comerro = true;
                })
                index++;
            }while(!comerro);
        })
    }catch(err) {
        res.status(400).json({err})
    }
}

const read = async (req, resp) => {
     // FILTRO POR ID
    let filtro = {};
    let id = req.params.id;
    if(id != undefined) filtro = { where : {id:id}};

    filtro.include = { model : cursoComponente, include : { model : componente } }

    filtro.attributes = {
        exclude: ['id_componente']
    }
     // FILTRO SEM ID, BUSCA TUDO NO BD
    const ret = await curso.findAll(filtro);
    resp.json(ret);
}

const update = async (req, resp) => {
    const id = req.params.id;
    const data = req.body;
    let ret = await curso.update(data, {
        where : {id: id},
    });
    ret = await curso.findAll({
        where : { id : id}
    })
    resp.json(ret);
}

const remove = async (req, res) => {
    const id = req.params.id;
    const ret = await curso.destroy ({
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