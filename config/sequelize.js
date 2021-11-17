const config = require("./config");
const Sequelize = require("sequelize");
const PersonalDetailsModal = require("../models/personal_details");
const RestaurantsModal = require("../models/restaurants");
const MenusModal = require("../models/menus")
const RestaurantMenuModal = require("../models/restaurant_city_map")
const CityModal = require("../models/city");
const CityMenuMap = require("../models/city_menu_map");
const CuisineModal = require("../models/cuisine");
const RestaurantCityModal = require("../models/restaurant_city_map");
const CuisineRestaurantMapModal = require("../models/cuisine_restaurant_map");
const RestaurantMenuMapModal = require("../models/restaurants_menu_map");
const RestaurantListingModal = require("../models/restaurants_listing");
const ContactModal = require("../models/contact_us");
const CustomerModal = require("../models/customer");


const connection = new Sequelize(
    config.sqldbName,
    config.sqlusername,
    config.sqlpassword,
    {
      host: config.sqlhost,
      dialect: "mysql",
      port:3360,
      pool: {
        max: 10,
        min: 0,
        acquire: 100000,
        idle: 10000,
      },
      define: {
        timestamps: false,
      },
      logging: false
    }
  );

  const personalDetailsModal = PersonalDetailsModal(connection);
  const restaurantsModal = RestaurantsModal(connection);
  const menusModal = MenusModal(connection);
  const restaurantMenuModal = RestaurantMenuModal(connection)
  const cityModal = CityModal(connection)
  const cityMenuMap = CityMenuMap(connection)
  const cuisineModal = CuisineModal(connection)
  const restaurantCityModal = RestaurantCityModal(connection)
  const cuisineRestaurantMapModal = CuisineRestaurantMapModal(connection)
  const restaurantMenuMapModal = RestaurantMenuMapModal(connection)
  const restaurantListingModal = RestaurantListingModal(connection)
  const contactModal = ContactModal(connection)
  const customerModal = CustomerModal(connection)

  restaurantsModal.hasMany(restaurantMenuModal, {foreignKey: "restaurant_id"})
  restaurantMenuModal.belongsTo(restaurantsModal, {foreignKey: "restaurant_id"})

  restaurantsModal.hasMany(restaurantMenuModal, {foreignKey: "id"})
  restaurantMenuModal.belongsTo(restaurantsModal, {foreignKey: "restaurant_id"})

  cityModal.hasMany(restaurantMenuModal, {foreignKey: "city_id"})
  restaurantMenuModal.belongsTo(cityModal, {foreignKey: "city_id"})

  restaurantsModal.belongsTo(cityModal, {foreignKey: "id"})

  cityMenuMap.belongsTo(cityModal, {foreignKey: "city_id"})
  cityModal.hasMany(cityMenuMap, {foreignKey: "city_id"})

  cityMenuMap.belongsTo(menusModal, {foreignKey: "menu_id"})
  menusModal.hasMany(cityMenuMap, {foreignKey: "menu_id"})
  
  restaurantCityModal.belongsTo(cityModal, {foreignKey:"city_id"})
 // cityModal.hasMany(restaurantsModal, {foreignKey : "city_id"})

  cuisineModal.hasMany(cuisineRestaurantMapModal, {foreignKey : "cuisine_id"})
  cuisineRestaurantMapModal.belongsTo(cuisineModal,  {foreignKey:"cuisine_id"})

  cuisineRestaurantMapModal.belongsTo(restaurantsModal,  {foreignKey:"restaurant_id"})
  restaurantsModal.hasMany(cuisineRestaurantMapModal, {foreignKey : "restaurant_id"})

  restaurantMenuMapModal.belongsTo(restaurantsModal, {foreignKey:"restaurnt_id"})
  restaurantsModal.hasOne(restaurantMenuMapModal, {foreignKey : "restaurnt_id"})

  restaurantMenuMapModal.belongsTo(cityModal, {foreignKey:"city_id"})
  cityModal.hasMany(restaurantMenuMapModal, {foreignKey : "city_id"})




  module.exports = {
    connection,
    personalDetailsModal,
    restaurantsModal,
    menusModal,
    restaurantMenuModal,
    cityModal,
    cityMenuMap,
    cuisineModal,
    restaurantCityModal,
    cuisineRestaurantMapModal,
    restaurantMenuMapModal,
    restaurantListingModal,
    customerModal,
    contactModal
  }