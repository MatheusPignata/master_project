const { Model, DataTypes } = require('sequelize');

class tipoAmbiente extends Model{
    static init(datacon) {
        super.init({
            tipo: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
        },{
            sequelize: datacon,
            tableName: 'tipo_ambientes',
            modelName: 'tipoAmbiente',
        })
        
    }

    static associate(models) {
        tipoAmbiente.hasMany(models.ambiente, {foreignKey: 'id_tipo'});
    }
}
module.exports = tipoAmbiente;