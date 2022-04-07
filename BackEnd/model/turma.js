const { Model, DataTypes } = require('sequelize');

class turma extends Model{
    static init(datacon) {
        super.init({
            id_curso: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'cursos',
                    foreignKey: 'id'
                }
            },
            alunos: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {
            sequelize: datacon,
            tableName: 'turmas',
            modelName: 'turma',
        }
        );
    }

    static associate(models) {
      turma.belongsTo(models.curso, {foreignKey: 'id_curso'});
      turma.belongsTo(models.cursoComponente, {foreignKey: 'id_curso'});
    }
}
module.exports = turma;