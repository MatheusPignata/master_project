const { Model, DataTypes } = require('sequelize');

class ambiente extends Model{
    static init(datacon) {
        super.init({
            id_tipo: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'tipo_ambientes',
                    key: 'id',
                }
            },
            capacidade: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },{
            sequelize: datacon,
            tableName: 'ambientes',
            modelName: 'ambiente',
        });
    }
    static associate(models) {
        ambiente.belongsTo(models.tipoAmbiente, {foreignKey: 'id_tipo'});
        ambiente.hasMany(models.agenda, {foreignKey: 'id_ambiente'});
    }
};
module.exports = ambiente;