const { Model, DataTypes } = require('sequelize');

class agenda extends Model{
    static init(datacon) {
        super.init({
            id_ambiente: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'ambientes',
                    key: 'id',
                }
           },
            id_turma: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'turmas',
                    key: 'id',
                },
            },
            id_docente: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'usuarios',
                    key: 'id',
                }
            },
            data_inicial: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            data_final: {
                type: DataTypes.DATE,
                allowNull: false,
            }
        },
        {
        sequelize: datacon,
        tableName: 'agendas',
        modelName: 'agenda',
        });
    }
    
    static associate(models) {
        agenda.belongsTo(models.ambiente, {foreignKey: 'id_ambiente'});
        agenda.belongsTo(models.turma, {foreignKey: 'id_turma'});
        agenda.belongsTo(models.usuario, {foreignKey: 'id_docente'});
    }
} 
//EXPORTANDO A CLASSE
module.exports = agenda;