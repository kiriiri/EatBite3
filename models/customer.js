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
    detail_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "Customer's associated personal details",
      field: "detail_id",
      unique: "customer_uk_detail_id"
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: "0.0",
      primaryKey: false,
      autoIncrement: false,
      comment: "Customer's overall rating",
      field: "rating"
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
      comment: "NULL - Self sign-up, > 0 - User who created",
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
    tableName: "customer",
    comment: "",
    indexes: [{
      name: "customer_fk_user_created_by",
      unique: false,
      type: "BTREE",
      fields: ["created_by"]
    }, {
      name: "customer_fk_user_modified_by",
      unique: false,
      type: "BTREE",
      fields: ["modified_by"]
    }, {
      name: "customer_fk_personal_detail_detail_id",
      unique: false,
      type: "BTREE",
      fields: ["detail_id"]
    }]
  };
  const CustomerModel = sequelize.define("customer_model", attributes, options);
  return CustomerModel;
};