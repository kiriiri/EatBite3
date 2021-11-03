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
    customer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "Reference to the customer",
      field: "customer_id"
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "Reference to a backend/portal user",
      field: "user_id",
      references: {
        key: "id",
        model: "user_model"
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "email"
    },
    mobile: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "mobile"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "password"
    },
    tc_status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: "Terms and Conditions status : 0 - Not accepted, 1 - Accepted",
      field: "tc_status"
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
    tableName: "credentials",
    comment: "",
    indexes: [{
      name: "credentials_uk_customer",
      unique: true,
      type: "BTREE",
      fields: ["email", "customer_id", "mobile"]
    }, {
      name: "credentials_uk_user",
      unique: true,
      type: "BTREE",
      fields: ["user_id", "email", "mobile"]
    }, {
      name: "credentials_fk_user_created_by",
      unique: false,
      type: "BTREE",
      fields: ["created_by"]
    }, {
      name: "credentials_fk_user_modified_by",
      unique: false,
      type: "BTREE",
      fields: ["modified_by"]
    }, {
      name: "credentials_fk_customer_customer_id",
      unique: false,
      type: "BTREE",
      fields: ["customer_id"]
    }]
  };
  const CredentialsModel = sequelize.define("credentials_model", attributes, options);
  return CredentialsModel;
};