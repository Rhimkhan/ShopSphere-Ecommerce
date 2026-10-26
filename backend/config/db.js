const dns = require("dns");
dns.setServers(["8.8.8.8"]);

const mongoose = require("mongoose");

let mongoServer;

const connectDB = async () => {
  const connStr = process.env.MONGODB_URI;
  const isProduction = process.env.NODE_ENV === "production";

  console.log("DNS Servers:", dns.getServers());

  // 1. Connect to MongoDB Atlas
  if (connStr) {
    try {
      const conn = await mongoose.connect(connStr, {
        serverSelectionTimeoutMS: 10000,
      });

      console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
      return;
    } catch (error) {
      console.error("❌ MongoDB Connection Error:");
      console.error(error);

      if (isProduction) {
        process.exit(1);
      }
    }
  }

  // 2. Try local MongoDB
  try {
    const conn = await mongoose.connect(
      "mongodb://127.0.0.1:27017/shopsphere",
      {
        serverSelectionTimeoutMS: 3000,
      }
    );

    console.log(`✅ Local Mongo Connected: ${conn.connection.host}`);
    return;
  } catch (err) { }

  // 3. In-memory MongoDB
  if (!isProduction) {
    try {
      const { MongoMemoryServer } = require("mongodb-memory-server");

      mongoServer = await MongoMemoryServer.create();

      const conn = await mongoose.connect(mongoServer.getUri());

      console.log(
        `✅ MongoDB Connected Successfully (In-Memory): ${conn.connection.host}`
      );
    } catch (err) {
      console.error("❌ In-Memory Mongo Error:");
      console.error(err);
      process.exit(1);
    }
  } else {
    process.exit(1);
  }
};

module.exports = connectDB;
