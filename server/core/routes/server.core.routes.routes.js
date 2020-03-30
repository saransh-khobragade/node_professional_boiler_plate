const core = require('../controllers/server.core.controllers.core');
const redis_manager = require('../../utilities/server.utilities.redis_controller');
const auth = require('../../auth/server.auth')
const req = require('request');

module.exports = (app) => {

  app.route('/ping')
    .get(core.ping);

  app.route('/register')
    .post(core.register);

  app.route('/login')
    .post(core.login);

  app.route('/get_menu')
    .get(auth.verify(req, 1), core.get_menu);



  app.route('/create_category')
    .post(auth.verify(req, 2), core.create_category);

  app.route('/get_all_category')
    .get(auth.verify(req, 2), core.get_all_category);

  app.route('/update_category_by_id')
    .put(auth.verify(req, 2), core.update_category_by_id);



  app.route('/create_product')
    .post(auth.verify(req, 2), core.create_product);

  app.route('/get_all_product')
    .get(auth.verify(req, 2), core.get_all_product);

  app.route('/update_product_by_id')
    .put(auth.verify(req, 2), core.update_product_by_id);

  app.route('/soft_delete_product_by_id')
    .delete(auth.verify(req, 2), core.soft_delete_product_by_id);

  app.route('/hard_delete_product_by_id')
    .delete(auth.verify(req, 2), core.hard_delete_product_by_id);



  app.route('/create_dynamic_mapping')
    .post(auth.verify(req, 2), core.create_dynamic_mapping);

  app.route('/get_all_dynamic_mapping')
    .get(auth.verify(req, 2), core.get_all_dynamic_mapping);

  app.route('/update_mapping_by_id')
    .put(auth.verify(req, 2), core.update_mapping_by_id);

};