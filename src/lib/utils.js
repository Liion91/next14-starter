
import mongoose from "mongoose"

const username = encodeURIComponent(process.env.mongoUsr);
const password = encodeURIComponent(process.env.mongoPwd);
const cluster = encodeURIComponent(process.env.mongoCluster);

let uri =
  `mongodb+srv://${username}:${password}@${cluster}/Next14?retryWrites=true&w=majority&appName=Next14`;

const connection = {};

export const connectToDb = async () => {
    try {
        if (connection.isConnected) {
            console.log("Using existing connection");
            return;
        }
        const db = await mongoose.connect(uri);
        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};