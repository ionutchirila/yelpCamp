
// getting-started.js
const mongoose = require('mongoose');
//
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

//varianta de pe site 
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
    console.log('Database connected');
}

const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({});//sterge tot din baza de date
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6192cce1255d70c14a5440a6',
            location: `${cities[random1000].city} ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://source.unsplash.com/collection/483251`,
            description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam dolores commodi excepturi sapiente in consectetur, sequi optio eum saepe voluptatibus possimus autem nisi eligendi itaque incidunt. Dolor at libero nemo.>`,
            price
        })
        await camp.save();//salveaza in baza de date
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});