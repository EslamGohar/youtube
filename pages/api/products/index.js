import Product from "../../../models/Product";
import dbConnect from "../../../util/dbConnect";

export default async function handler(req, res) {
  const { method, cookies } = req;
  const token = cookies.token;

  await dbConnect();

  if (method === "GET") {
    const products = await Product.find();
    res.status(200).json(products);
  }

  if (method === "POST") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("Not Authenticated!");
    }

    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
