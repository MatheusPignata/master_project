const { Model, DataTypes } = require('sequelize');

class usuario extends Model{
    static init(datacon) {
        super.init({
            nome: {
                type: DataTypes.STRING(75),
                allowNull: false,
            },
            telefone: {
                type: DataTypes.STRING(20),
                allowNull: false,
                },
            cargo: {
                type: DataTypes.STRING(50),
                allowNull: false,
                }, 
            email: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: {
                    msg: "E-mail ou senha invalido",
                    }
                }
            },
            senha: {
                type: DataTypes.STRING(50),
                allowNull: false,
                },
            foto: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
                },
            cpf: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            resetsenha: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            carga_horaria: {
                type: DataTypes.INTEGER(50),
                allowNull: true,
            },
            formacao: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
        },
        {
        sequelize: datacon,
        tableName: 'usuarios',
        modelName: 'usuario',
        });
    }
    //METODO ASSOCIACAO DAS CHAVES PRIMARIAS
    static associate(models) {
        usuario.hasMany(models.agenda, {foreignKey: 'id_docente'});
    }
    
} 
//QUANDO EXPORTA AS CLASSE, TUDO QUE ESTA DENTRO DELA É EXPORTADO
module.exports = usuario;