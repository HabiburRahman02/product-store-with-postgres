import sql from "../config/db.js";

export const getProducts = async(req, res) => {
  try {
    const products = await sql`
    SELECT * FROM products
    ORDER BY created_at DESC
    `;
    console.log('products', products);
    res.status(200).json({success: true, data: products})
  } catch (error) {
    console.log('getProducts Error', error);
  }
};

export const getProduct = async(req, res) => {
    
};
export const createProduct = async(req, res) => {
    const {name,image,price} = req.body
    if(!name || !image || !price){
        return res.status(400).send({success: false, message: 'Every field is required'})
    }
  try {
    const newProduct = await sql`
    INSERT INTO products(name, image, price)
    VALUES (${name}, ${image}, ${price})
    RETURNING *
    `; 
    res.status(201).json({success: true, data: newProduct})
  } catch (error) {
    console.log('Error createProduct', error);
  }
};
export const updateProduct = async(req, res) => {};
export const deleteProduct = async(req, res) => {};

