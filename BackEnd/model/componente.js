const { Model, DataTypes } = require('sequelize');

class componente extends Model{
    static init(datacon) {
        super.init({
            materia: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            carga_horaria: {
                type: DataTypes.DECIMAL(5, 2),
                allowNull: false,
            },
        },{
            sequelize: datacon,
            tableName: 'componentes',
            modelName: 'componente',
        })
    }
    static associate(models) {
        componente.hasMany(models.cursoComponente, {foreignKey: 'id_componente'});
        componente.hasMany(models.curso, {foreignKey: 'id_componente'});
    }
}
module.exports = componente;