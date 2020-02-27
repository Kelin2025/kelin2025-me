import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    w: "majority",
    connectTimeoutMS: 15000
  })
  .then(() => console.log("Connected to DB!"))
  .catch(e => console.error("Could not connect to db", e));

mongoose.connection.on("error", err => {
  console.error(err);
});
