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
    restaurnt_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "restaurnt_id",
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
    menu_link: {
      type: DataTypes.STRING(800),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "menu_link"
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
      field: "created_by",
      references: {
        key: "id",
        model: "user_model"
      }
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
    tableName: "restaurants_menu_map",
    comment: "",
    indexes: [{
      name: "restaurants_menu_map_FK_1",
      unique: false,
      type: "BTREE",
      fields: ["restaurnt_id"]
    }, {
      name: "restaurants_menu_map_FK_2",
      unique: false,
      type: "BTREE",
      fields: ["city_id"]
    }, {
      name: "restaurants_menu_map_FK_3",
      unique: false,
      type: "BTREE",
      fields: ["created_by"]
    }]
  };
  const RestaurantsMenuMapModel = sequelize.define("restaurants_menu_map_model", attributes, options);
  return RestaurantsMenuMapModel;
};