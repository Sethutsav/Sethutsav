const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://kumarutsav1206:Utsav12*@cluster0.oo1vnqi.mongodb.net/FoodZoneMern?retryWrites=true&w=majority';

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log("Connected to MongoDB");

        const fetched_data = await mongoose.connection.db.collection("food_items");
        fetched_data.find({}).toArray(function( err, data ){
            
        })
        global.food_items = fetched_data;
        // console.log(global.food_items);

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectToMongoDB;



