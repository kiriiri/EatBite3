const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "Id"
    },
    restaurant_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "restaurant_id",
      references: {
        key: "id",
        model: "restaurants_model"
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
    tableName: "restaurant_city_map",
    comment: "",
    indexes: [{
      name: "restaurant_city_map_FK",
      unique: false,
      type: "BTREE",
      fields: ["city_id"]
    }, {
      name: "restaurant_city_map_FK_1",
      unique: false,
      type: "BTREE",
      fields: ["restaurant_id"]
    }]
  };
  const RestaurantCityMapModel = sequelize.define("restaurant_city_map_model", attributes, options);
  return RestaurantCityMapModel;
};