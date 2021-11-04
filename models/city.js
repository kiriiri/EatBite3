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
    country_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "country_id"
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "name"
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "Latitude of the city",
      field: "latitude"
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "Longitude of the city",
      field: "longitude"
    },
    is_default: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: "If major city for the given country i.e 0 - Not default, 1 - Default",
      field: "is_default"
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: "is active for business i.e. 1 - Active, 0 - Inactive",
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
      allowNull: false,
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
      field: "modified_by",
      references: {
        key: "id",
        model: "user_model"
      }
    }
  };
  const options = {
    tableName: "city",
    comment: "",
    indexes: [{
      name: "city_fk_user_created_by",
      unique: false,
      type: "BTREE",
      fields: ["created_by"]
    }, {
      name: "city_fk_user_modified_by",
      unique: false,
      type: "BTREE",
      fields: ["modified_by"]
    }]
  };
  const CityModel = sequelize.define("city_model", attributes, options);
  return CityModel;
};