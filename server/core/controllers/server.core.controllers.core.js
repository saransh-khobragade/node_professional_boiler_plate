const auth = require('../../auth/server.auth');
const bcrypt = require('bcryptjs');
const db = require('../helpers/server.core.helpers.mongo_crud');


exports.ping = (req, res) => {
  logger.put('[server][controllers][core][ping] starts',res,true);
  return res.status(200).send({ "message": "pong" });
};

exports.register = async (req, res) => {
  try {
    const { name, type, password, email } = req.body

    logger.put('[server][controllers][core][register] starts'+JSON.stringify(req.body),res);

    if (!name) throw new Error("Please send name in body")
    if (!email) throw new Error("Please send email in body")
    if (!type) throw new Error("Please send type in body")
    if (!password) throw new Error("Please send password in body")

    const hashedPassword = bcrypt.hashSync(password, 8);

    const user_obj = { name, email, type, password: hashedPassword }

    const result = await db.find_all('user', { email })
    if (result.length === 0) {
      const result2 = await db.insert('user', user_obj)
      if (result2.insertedCount === 1) {
        return auth.generate(req, res,type)
      } else {
        throw new Error("register failed")
      }
    } else {
      throw new Error("already registered")
    }
  } catch (err) {
    logger.put('[server][controllers][core][register] err:'+err.message,res,true,err);

    return res.status(400).send({ err: err.message })
  }
};

exports.login = async (req, res) => {
  try {
    logger.put('[server][controllers][core][login] start',res,true);

    const { password, email } = req.body

    if (!email) throw new Error("Please send email in body")
    if (!password) throw new Error("Please send password in body")

    const user_obj = { email }

    const result = await db.find_all('user', user_obj)

    if (result.length === 1) {

      const result3 = await bcrypt.compare(password, result[0].password)
      if (result3) {
        return auth.generate(req, res,result[0].type)
      } else {
        throw new Error("invalid password")
      }

    } else {
      throw new Error("not registered")
    }
  } catch (err) {
    logger.put('[server][controllers][core][login] start err:'+err.message,res,true,err);

    return res.status(400).send({ err: err.message })
  }
};

exports.create_category = async (req, res) => {
  try {
    logger.put('[server][controllers][core][create_category] start'+JSON.stringify(req.body),res,true);

    const { name,parent_category } = req.body

    if (!name) throw new Error("Please send name in body")
    if (parent_category != false && parent_category != true)  throw new Error("Please send parent_category in body")


    const cat_obj = { name,parent_category }

    const result = await db.find_all('category', { name })
    if (result.length === 0) {
      const result2 = await db.insert('category', cat_obj)
      if (result2.insertedCount === 1) {
        return res.status(201).send({ category_id: result2.insertedId })
      } else {
        throw new Error("category insert failed")
      }
    } else {
      throw new Error("already category present")
    }
  } catch (err) {
    logger.put('[server][controllers][core][create_category] err:'+err.message,res,true,err);

    return res.status(400).send({ err: err.message })
  }
};

exports.create_product = async (req, res) => {
  try {
    logger.put('[server][controllers][core][create_product] start'+JSON.stringify(req.body),res,true);

    const { name, price, des } = req.body

    if (!name) throw new Error("Please send name in body")
    if (!price) throw new Error("Please send price in body")
    if (!des) throw new Error("Please send des in body")


    const product_obj = { name, price, des, is_active: true }

    const result = await db.find_all('product', { name })
    if (result.length === 0) {
      const result2 = await db.insert('product', product_obj)
      if (result2.insertedCount === 1) {
        return res.status(201).send({ product_id: result2.insertedId })
      } else {
        throw new Error("product insert failed")
      }
    } else {
      throw new Error("already product present")
    }
  } catch (err) {
    logger.put('[server][controllers][core][create_product] err:'+err.message,res,true,err);

    return res.status(400).send({ err: err.message })
  }
};

exports.get_all_product = async (req, res) => {
  try {
    logger.put('[server][controllers][core][get_all_product] start',res,true);

    const result = await db.find_all('product', {})
    res.status(200).send(result)

  } catch (err) {
    logger.put('[server][controllers][core][get_all_product] err'+err.message,res,true,err);

    return res.status(400).send({ err: err.message })
  }
};

exports.get_all_category = async (req, res) => {
  try {
    logger.put('[server][controllers][core][get_all_category] start',res,true);

    const result = await db.find_all('category', {})
    res.status(200).send(result)

  } catch (err) {
    logger.put('[server][controllers][core][get_all_category] err'+err.message,res,true,err);

    return res.status(400).send({ err: err.message })
  }
};

exports.get_all_dynamic_mapping = async (req, res) => {
  try {

    logger.put('[server][controllers][core][get_all_dynamic_mapping] start',res,true);

    const result = await db.find_all('dynamic_mapping', {})
    res.status(200).send(result)

  } catch (err) {
    logger.put('[server][controllers][core][get_all_dynamic_mapping] err'+err.message,res,true,err);

    return res.status(400).send({ err: err.message })
    http_response.bad_request(res, "URI format not specified", app_constants.res_code_bad_request);

  }
};

exports.create_dynamic_mapping = async (req, res) => {
  try {
    logger.put('[server][controllers][core][create_dynamic_mapping] start'+JSON.stringify(req.body),res,true);

    const { category_id, mapped_id, mapping_type } = req.body

    if (!category_id) throw new Error("Please send category_id in body")
    if (!mapped_id) throw new Error("Please send mapped_id(category or product_id) in body")
    if (mapping_type !== 'category_to_category' && mapping_type !== 'category_to_product') throw new Error("Please send proper mapping_type in body")

    const map_obj = { category_id, mapped_id, mapping_type, is_active: true }

    const result = await db.insert('dynamic_mapping', map_obj)
    if (result.insertedCount === 1) {
      return res.status(201).send({ mapping_id: result.insertedId })
    } else {
      throw new Error("category_product_mapping insert failed")
    }

  } catch (err) {
    logger.put('[server][controllers][core][create_dynamic_mapping] err'+err.message,res,true,err);

    return res.status(400).send({ err: err.message })
  }

};

exports.get_menu = async (req, res) => {
  try {
    logger.put('[server][controllers][core][get_menu] start',res,true);

    const category = await db.find_all('category')
    const product = await db.find_all('product')
    const dynamic_mapping = await db.find_all('dynamic_mapping')

    const result = []

    category.forEach(cat => {
      if(cat.parent_category){
        result.push({ 
          category_name:cat.name,
          category_id: cat._id,
          category_details: get_cat_child(cat._id, dynamic_mapping,category,product) })
      }
    });

    return res.status(200).send({ menu: result })


  } catch (err) {
    logger.put('[server][controllers][core][get_menu] err'+err.message,res,true,err);

    return res.status(400).send({ err: err.message })
  }

};

const get_cat_child = (cat_id, dynamic_mapping,category,product) => {

  const result = dynamic_mapping.filter(map => map.category_id === cat_id.toString())
  const return_array = []

  result.forEach((map) => {
    if (map.mapping_type === "category_to_category") {
      return_array.push({
        category_id:map.mapped_id,
        category_details: get_cat_child(map.mapped_id, dynamic_mapping,category,product),
        category_name: category.filter(x=>x._id.toString() === map.mapped_id)[0].name})
    } else {
      return_array.push({product_details: product.filter(x=>x._id.toString() === map.mapped_id && x.is_active)})
    }
  })

  return return_array

}

exports.update_category_by_id = async (req, res) => {
  try {
    logger.put('[server][controllers][core][update_category_by_id] start'+JSON.stringify(req.body),res,true);


    const { id,name,parent_category } = req.body

    if (!id) throw new Error("Please send id in body")
    if (!name) throw new Error("Please send name in body")
    if (parent_category != false && parent_category != true) throw new Error("Please send parent_category in body")

    const cat_update_obj = {
      name,parent_category
    }

    const result = await db.update_by_id('category',id,cat_update_obj)
    if (result === 1){
      res.status(200).send({message:"Updated successfully"})
    }else{
      res.status(200).send({message:"Did not updated anything"})
    }
    
  } catch (err) {
    logger.put('[server][controllers][core][update_category_by_id] err'+err.message,res,true,err);

    return res.status(400).send({ err: err.message })
  }
};

exports.update_product_by_id = async (req, res) => {
  try {
    logger.put('[server][controllers][core][update_product_by_id] start'+JSON.stringify(req.body),res,true);


    const { id,name, price, des } = req.body

    if (!id) throw new Error("Please send name in body")
    if (!name) throw new Error("Please send name in body")
    if (!price) throw new Error("Please send price in body")
    if (!des) throw new Error("Please send des in body")

    const prod_update_obj = {
      name,price,des
    }

    const result = await db.update_by_id('product',id,prod_update_obj)
    if (result === 1){
      res.status(200).send({message:"Updated successfully"})
    }else{
      res.status(200).send({message:"Did not updated anything"})
    }
    
  } catch (err) {
    logger.put('[server][controllers][core][update_product_by_id] err'+err.message,res,true);

    return res.status(400).send({ err: err.message })
  }
};


exports.update_mapping_by_id = async (req, res) => {
  try {
    logger.put('[server][controllers][core][update_mapping_by_id] start'+JSON.stringify(req.body),res,true);

    const { id,category_id, mapped_id, mapping_type } = req.body

    if (!id) throw new Error("Please send id in body")
    if (!category_id) throw new Error("Please send category_id in body")
    if (!mapped_id) throw new Error("Please send mapped_id(category or product_id) in body")
    if (mapping_type !== 'category_to_category' && mapping_type !== 'category_to_product') throw new Error("Please send proper mapping_type in body")


    const mapping_update_obj = {
      category_id,mapped_id,mapping_type
    }

    const result = await db.update_by_id('dynamic_mapping',id,mapping_update_obj)
    if (result === 1){
      res.status(200).send({message:"Updated successfully"})
    }else{
      res.status(200).send({message:"Did not updated anything"})
    }
    
  } catch (err) {
    logger.put('[server][controllers][core][update_mapping_by_id] err:'+err.message,res,true,err);

    return res.status(400).send({ err: err.message })
  }
};

exports.soft_delete_product_by_id = async (req, res) => {
  try {
    logger.put('[server][controllers][core][soft_delete_product_by_id] start'+JSON.stringify(req.body),res,true);


    const { id } = req.body

    if (!id) throw new Error("Please send id in body")

    const result = await db.update_specific_key_by_id('product',id,{is_active:false})
    if (result === 1){
      res.status(200).send({message:"Soft deleted successfully"})
    }else{
      res.status(200).send({message:"Did not soft deleted anything"})
    }
    
  } catch (err) {
    logger.put('[server][controllers][core][soft_delete_product_by_id] err'+err.message,res,true,err);

    return res.status(400).send({ err: err.message })
  }

};

exports.hard_delete_product_by_id = async (req, res) => {
  try {
    logger.put('[server][controllers][core][hard_delete_product_by_id] start'+JSON.stringify(req.body),res,true);

    const { id } = req.body

    if (!id) throw new Error("Please send id in body")

    const result = await db.delete_by_id('product',id)
    if (result === 1){
      res.status(200).send({message:"Hard deleted successfully"})
    }else{
      res.status(200).send({message:"Did not hard deleted anything"})
    }
    
  } catch (err) {
    logger.put('[server][controllers][core][hard_delete_product_by_id] err'+err.message,res,true,err);

    return res.status(400).send({ err: err.message })
  }

};