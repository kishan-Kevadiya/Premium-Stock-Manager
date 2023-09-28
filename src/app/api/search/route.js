import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const query = request.nextUrl.searchParams.get("query"); // Use request.query to access query parameters

  const uri = "mongodb+srv://kishankevadiya123:CP58ZrlUooGxs2yV@alsostocking.p412aac.mongodb.net/";

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect(); // Connect to the MongoDB cluster

    const database = client.db('stuck');
    const invent = database.collection('invent');

    const products = await invent.aggregate([
      {
        $match: {
          slug: { $regex: query, $options: 'i' }, // Use $options to specify regex options
        },
      },
    ]).toArray();

    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("MongoDB Error:", error);
    return NextResponse.error("An error occurred while fetching data from the database.");
  } finally {
    // Ensure that the client will close when you finish/error
    await client.close();
  }
}
