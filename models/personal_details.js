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
    first_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "first_name"
    },
    last_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "last_name"
    },
    id_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "National I.D number",
      field: "id_number",
      unique: "user_uk_id_number"
    },
    profile_photo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "Profile photo url",
      field: "profile_photo"
    },
    country_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "User's associated country id",
      field: "country_id",
      references: {
        key: "id",
        model: "country_model"
      }
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "Date of birth",
      field: "dob"
    },
    gender: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "0 - Female, 1 - Male",
      field: "gender"
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
      comment: "NULL - When self signup, > 0 - User(admin) who created",
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
    tableName: "personal_details",
    comment: "",
    indexes: [{
      name: "personal_detail_fk_country_country_id",
      unique: false,
      type: "BTREE",
      fields: ["country_id"]
    }, {
      name: "personal_detail_fk_user_created_by",
      unique: false,
      type: "BTREE",
      fields: ["created_by"]
    }, {
      name: "personal_detail_fk_user_modified_by",
      unique: false,
      type: "BTREE",
      fields: ["modified_by"]
    }]
  };
  const PersonalDetailsModel = sequelize.define("personal_details_model", attributes, options);
  return PersonalDetailsModel;
};