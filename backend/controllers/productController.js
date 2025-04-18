import sql from "../config/db.js";

export const getProducts = async (req, res) => {
  try {
    const products = await sql`
    SELECT * FROM products
    ORDER BY created_at DESC
    `;
    console.log('products', products);
    res.status(200).json({ success: true, data: products })
  } catch (error) {
    console.log('getProducts Error', error);
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await sql`
    SELECT * FROM products WHERE id=${id}
    `;
    if (product.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product })
  } catch (error) {
    console.log('getProduct Error', error);
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
};

export const createProduct = async (req, res) => {
  const { name, image, price } = req.body
  if (!name || !image || !price) {
    return res.status(400).send({ success: false, message: 'Every field is required' })
  }
  try {
    const newProduct = await sql`
    INSERT INTO products(name, image, price)
    VALUES (${name}, ${image}, ${price})
    RETURNING *
    `;
    res.status(201).json({ success: true, data: newProduct })
  } catch (error) {
    console.log('Error createProduct', error);
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {name,image, price} = req.body;
  try {
    const updatedProduct = await sql`
    UPDATE products
    SET name = ${name}, image = ${image}, price = ${price}
    WHERE id = ${id}
    RETURNING *
    `;

    if (updateProduct.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: updatedProduct })
  } catch (error) {
    console.log('updateProduct Error', error);
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await sql`
    DELETE FROM products
    WHERE id = ${id}
    RETURNING *
    `;
    if (deletedProduct.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: deletedProduct })
  } catch (error) {
    console.log('deleteProduct Error', error);
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
};

