import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI!);

// Create gridfs bucket
const conn = mongoose.connection;
conn.once("open", () => {
    new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "tracks",
        chunkSizeBytes: 1024 * 1024 // 1MB
    });
});