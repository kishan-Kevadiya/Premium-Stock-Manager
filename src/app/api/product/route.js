import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const uri = "mongodb+srv://kishankevadiya123:CP58ZrlUooGxs2yV@alsostocking.p412aac.mongodb.net/";

  const client = new MongoClient(uri);

  try {
    await client.connect(); // Connect to the MongoDB cluster

    const database = client.db('stuck');
    const invent = database.collection('invent');

    // Query for products (replace with your specific query)
    const query = {};
    const products = await invent.find(query).toArray();

    return NextResponse.json({success:true,products});
  } catch (error) {
    console.error("MongoDB Error:", error);
    return NextResponse.error("An error occurred while fetching data from the database.");
  } finally {
    // Ensure that the client will close when you finish/error
    await client.close();
  }
}





export async function POST(request) {

    let body = await request.json()
    // console.log(body);
  const uri = "mongodb+srv://kishankevadiya123:CP58ZrlUooGxs2yV@alsostocking.p412aac.mongodb.net/";

  const client = new MongoClient(uri);

  try {
    await client.connect(); // Connect to the MongoDB cluster

    const database = client.db('stuck');
    const invent = database.collection('invent');

    // Query for products (replace with your specific query)
    const query = {};
    const product = await invent.insertOne(body)

    return NextResponse.json({product,ok:true});
  } catch (error) {
    console.error("MongoDB Error:", error);
    return NextResponse.error("An error occurred while fetching data from the database.");
  } finally {
    // Ensure that the client will close when you finish/error
    await client.close();
  }
}
