import mongoose from 'mongoose'
const mongoAtlasUri = "mongodb+srv://root:root@cluster0.lsfzk.mongodb.net/MyInvestment?retryWrites=true&w=majority";

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );

} catch (e) {
  console.log("could not connect")
}

const db = mongoose.connection
// const db = 123

export default db