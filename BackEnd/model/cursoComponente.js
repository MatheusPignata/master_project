const { Model, DataTypes } = require('sequelize');
//id da turma e id do componente (componente é a materia) um curso para varias materias, a classe turmacomponente vai virar curso
//tabala curso - campos, id, nome do curso, id das materias = id do componente

class cursoComponente extends Model{
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

            id_componente: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'componentes',
                    foreignKey: 'id'
                }
            },           
        },
        {
            sequelize: datacon,
            tableName: 'curso_componentes',
            modelName: 'cursoComponente',
        }
        );
    }
    static associate(models) {
        cursoComponente.belongsTo(models.curso, {foreignKey: 'id_curso'});
        cursoComponente.belongsTo(models.componente, {foreignKey: 'id_componente'});
    }
}
module.exports = cursoComponente;