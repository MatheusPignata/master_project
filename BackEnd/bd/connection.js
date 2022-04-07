//METODO PARA CONEXÃO COM O BANCO DE DADOS
require('dotenv').config();
const {Sequelize} = require('sequelize');

const componente = require('../model/componente');
const tipoAmbiente = require('../model/tipoAmbiente');
const ambiente = require('../model/ambiente');
const turma = require('../model/turma');
const usuario = require('../model/usuario');
const agenda = require('../model/agenda');
const curso = require('../model/curso');
const cursoComponente = require('../model/cursoComponente');

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER,"", {
    host: process.env.HOST,
    dialect: 'mysql',
    define: {
      timestamps: false,
    }
  });

  //METODO
  const sync = () =>{
    componente.init(sequelize);
    tipoAmbiente.init(sequelize);
    usuario.init(sequelize);
    ambiente.init(sequelize);    
    turma.init(sequelize);
    curso.init(sequelize);
    cursoComponente.init(sequelize);
    agenda.init(sequelize); 
  
    componente.associate(sequelize.models);  
    tipoAmbiente.associate(sequelize.models);
    ambiente.associate(sequelize.models);
    turma.associate(sequelize.models);
    curso.associate(sequelize.models);
    usuario.associate(sequelize.models);  
    agenda.associate(sequelize.models);
    cursoComponente.associate(sequelize.models);

    sequelize.sync({force: false});
  }

  const populate = async () => {
    await sequelize.query("INSERT INTO componentes VALUES (DEFAULT, 'FPOO', 45)");
    await sequelize.query("INSERT INTO componentes VALUES (DEFAULT, 'HARE', 45)");
    await sequelize.query("INSERT INTO componentes VALUES (DEFAULT, 'LIMA', 45)");
    await sequelize.query("INSERT INTO componentes VALUES (DEFAULT, 'SOP', 45)");
  }

  //EXPORTANDO OS METODOS CRIADOS ACIMA
  module.exports = {
    sequelize,
    sync,
    populate
  }