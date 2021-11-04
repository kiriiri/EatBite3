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
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "name",
      unique: "country_uk_name"
    },
    currency_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "currency_name"
    },
    currency_code: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "ISO 4217 currency code",
      field: "currency_code",
      unique: "country_uk_currency_code"
    },
    currency_symbol: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "Currency symbol/sign",
      field: "currency_symbol"
    },
    calling_code: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "Country calling code",
      field: "calling_code"
    },
    flag_icon: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "Flag icon path or url",
      field: "flag_icon"
    },
    is_default: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "is_default"
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
      field: "modified_by",
      references: {
        key: "id",
        model: "user_model"
      }
    }
  };
  const options = {
    tableName: "country",
    comment: "",
    indexes: [{
      name: "country_fk_user_created_by",
      unique: false,
      type: "BTREE",
      fields: ["created_by"]
    }, {
      name: "country_fk_user_modified_by",
      unique: false,
      type: "BTREE",
      fields: ["modified_by"]
    }]
  };
  const CountryModel = sequelize.define("country_model", attributes, options);
  return CountryModel;
};