const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require("./config/db");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require("path");
const ejs = require("ejs");
const bodyParser = require('body-parser');
require("./config/passport")(passport);

dotenv.config();

const app = express();

app.use(session({
    secret: 'satwik_backend_project_secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 180 * 60 * 1000 } // 3 hours
}));

app.use((req, res, next) => {
    res.locals.authUser = req.session.authUser;
    next();
});

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Connect to MongoDB
connectDB();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/', mainRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
