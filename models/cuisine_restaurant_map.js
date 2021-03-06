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
    cuisine_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "cuisine_id",
      references: {
        key: "id",
        model: "cuisine_model"
      }
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
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: "0-Not active, 1-Active",
      field: "status"
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
    tableName: "cuisine_restaurant_map",
    comment: "",
    indexes: [{
      name: "cuisine_restaurant_map_FK",
      unique: false,
      type: "BTREE",
      fields: ["cuisine_id"]
    }, {
      name: "cuisine_restaurant_map_FK_1",
      unique: false,
      type: "BTREE",
      fields: ["restaurant_id"]
    }]
  };
  const CuisineRestaurantMapModel = sequelize.define("cuisine_restaurant_map_model", attributes, options);
  return CuisineRestaurantMapModel;
};