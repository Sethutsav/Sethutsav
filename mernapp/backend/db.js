const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://kumarutsav1206:Utsav12*@cluster0.oo1vnqi.mongodb.net/FoodZoneMern?retryWrites=true&w=majority';

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log("Connected to MongoDB");

        const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

        global.food_items = fetched_data;
        global.foodCategory = foodCategory;

    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }                                                                                                                                                                                                                             
};

module.exports = connectToMongoDB;