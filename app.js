if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
console.log(process.env.CLOUDINARY_CLOUD_NAME)

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const { nextTick, getMaxListeners } = require('process');
const { required } = require('joi');

const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');

//varianta de pe site 
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
    console.log('Database connected');
}

//varianta lui Colt care nu functioneaza
// mongoose.connect('mongodb://localhost:27017/yelp-camp', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//     console.log("Database connected");
// });
//pana aici

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//'Tell express to parse "body"
app.use(express.urlencoded({ extended: true }));
//
app.use(methodOverride('_method'));/*betwen quotes I pass the string that Iwant to use*/
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfi = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfi))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    // console.log(req.session)
    res.locals.currentUser = req.user; //in all templates I have acces to "curent user"
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error');
    next();
});


// app.get('/fakeUser', async (req, res) => {
//     const user = new User({ emai: 'coltt@gmail.com', username: 'coltt' });
//     const newUser = await User.register(user, 'chicken');
//     res.send(newUser);
// })

app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);

app.get('/', (req, res) => {
    res.render('home')
})

//Demonstratie 
// app.get('/makecampground', async (req, res) => {
//     const camp = new Campground({ title: 'My Backyard', description: 'cheap camping!' });
//     await camp.save();
//     res.send(camp)
// })

// In pagina /campgrounds  si afiseaza ce este configurat in index.ejs






app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found mesg', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something went wrong!'
    res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
    console.log('Port 3000');
})