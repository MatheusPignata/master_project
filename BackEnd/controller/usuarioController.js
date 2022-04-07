const usuario = require ('../model/usuario');

const create = async (req, resp) => {
    const data = req.body;
    let ret = [];
   
    try {
        console.log("DATTTTA" + data)

        ret = await usuario.create(data);

        // NÃO RETORNA A SENHA
        delete ret.dataValues.senha;
    }catch(err) {
        console.log(err);
        if(err.parent.code == 'ER_DUP_ENTRY'){
            ret = {
                msg: "Erro ao cadastrar..."
            }
            resp.status(400);
       }
    }
    resp.json(ret);
}

const read = async (req, resp) => {
    // FILTRO POR ID
    let filtro = {attributes: {exclude: ['foto']}};
    let id = req.params.id;
    if(id != undefined) filtro = { where : {id:id}};
    // FILTRO SEM ID, BUSCA TUDO NO BD
    
    const ret = await usuario.findAll(filtro);
    
    console.log("TESTE READ", ret)

    resp.json(ret);
}

const update = async (req, resp) => {
    const id = req.params.id;
    const data = req.body;
    let ret = await usuario.update(data, {
        where : {id: id},
    });
    ret = await usuario.findAll({
        attributes: {
            exclude: ['senha']
        },
        where : { id : id}
    })
    resp.json(ret);
}

const remove = async (req, res) => {
    const id = req.params.id;
    const ret = await usuario.destroy ({
        where : { id : id}
    })
    if(ret == 1){
        res.json({id : id, mesage : 'Excluido com sucesso!!'});
        console.log({id : id}, "Excluido com sucesso!!")
    } else {
        res.status(400).send();
    }
}
// RECEBENDO E VALIDANDO O LOGIN PIGINATA
const login = async (req, res) => {
    const data = req.body;
    const ret = await usuario.findAll({
        attributes: {
            exclude: ['senha', 'nome', 'foto', 'cpf', 'telefone', 'email', 'cargo']
        },
        where: {
            cpf: data.cpf,
            senha:data.senha,        }
    })

    console.log(ret)

    res.json(ret);
}

// RECEBENDO E VALIDANDO O LOGIN MOBILE
const loginmobile = async (req, res) => {
    const data = req.body;
    const ret = await usuario.findAll({
        attributes: {
            exclude: ['senha']
        },
        where: {
            cpf: data.cpf,
            senha:data.senha,        }
    })

    console.log(ret)

    res.json(ret);
}

module.exports = {
    create,
    read,
    update,
    remove,
    login,
    loginmobile,    
}