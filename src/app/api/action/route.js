import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";


export async function POST(request) {

    let {action,slug,value,qunti} = await request.json()
    
  const uri = "mongodb+srv://kishankevadiya123:CP58ZrlUooGxs2yV@alsostocking.p412aac.mongodb.net/";

  const client = new MongoClient(uri);

 try {
    const database = client.db('stuck');
    const invent = database.collection('invent');

    const filter = {slug : slug };

    let newQuntity = action == 'add' ? (parseInt(qunti) + parseInt(value)) : (parseInt(qunti) -  parseInt(value))
    const updateDoc = {
      $set: {
        quntity: newQuntity,
      },
    };

    const result = await invent.updateOne(filter, updateDoc, {});
    
        return NextResponse.json({success:true,message:`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`});

  } finally {
    await client.close();
  }
}
