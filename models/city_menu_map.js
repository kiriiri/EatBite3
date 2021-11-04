const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id"
    },
    menu_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "menu_id",
      references: {
        key: "id",
        model: "menus_model"
      }
    },
    city_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "city_id",
      references: {
        key: "id",
        model: "city_model"
      }
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp'),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "date_created"
    },
    created_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "created_by"
    },
    date_modified: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "date_modified"
    },
    modified_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "modified_by"
    }
  };
  const options = {
    tableName: "city_menu_map",
    comment: "",
    indexes: [{
      name: "city_menu_map_FK",
      unique: false,
      type: "BTREE",
      fields: ["city_id"]
    }, {
      name: "city_menu_map_FK_1",
      unique: false,
      type: "BTREE",
      fields: ["menu_id"]
    }]
  };
  const CityMenuMapModel = sequelize.define("city_menu_map_model", attributes, options);
  return CityMenuMapModel;
};