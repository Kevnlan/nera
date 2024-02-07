require('dotenv').config()
/**
 *

const app = express();
const port = 3000;
const programmingLanguagesRouter = require("./routes/programmingLanguages");
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.get("/", (req, res) => {
    res.json({ message: "ok" });
});
app.use("/programming-languages", programmingLanguagesRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
 
*/


const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

const db = require("./app/models");
const Role = db.role;

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
    cookieSession({
        name: "kevlangat-session",
        keys: ["COOKIE_SECRET"], // should use as secret environment variable
        httpOnly: true,
    })
);


db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}

var { graphqlHTTP } = require("express-graphql")
var { buildSchema } = require("graphql")

const imagesData = [
    {
        id: 1,
        title: "Stacked Brwonies",
        owner: "Ella Olson",
        category: "Desserts",
        url: "https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg",
    },
    {
        id: 2,
        title: "Shallow focus photography of Cafe Latte",
        owner: "Kevin Menajang",
        category: "Coffee",
        url: "https://images.pexels.com/photos/982612/pexels-photo-982612.jpeg",
    },
    {
        id: 3,
        title: "Sliced Cake on White Saucer",
        owner: "Quang Nguyen Vinh",
        category: "Desserts",
        url: "https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg",
    },
    {
        id: 4,
        title: "Beverage breakfast brewed coffee caffeine",
        owner: "Burst",
        category: "Coffee",
        url: "https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg",
    },
    {
        id: 5,
        title: "Pancake with Sliced Strawberry",
        owner: "Ash",
        category: "Desserts",
        url: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
    },
];

/// GraphQL Schema
const schema = buildSchema(`
type Query {
  image(id: Int!): Image
  images(category: String): [Image]
}
type Image {
  id: Int
  title: String
  category: String
  owner: String
  url: String
}
`);

// Get single Image using id

function getImage(args) {
    for (const image of imagesData) {
        if (image.id === args.id) {
            return image;
        }
    }
}

//Get images using category

function getImages(args) {
    if (args.category) {
        return imagesData.filter(
            (image) => image.category.toLowerCase() === args.category.toLowerCase()
        );
    } else {
        return imagesData;
    }
}

// Resolver
const root = {
    image: getImage,
    images: getImages,
};


app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
)

console.log("Running a GraphQL API server at http://localhost:8080/graphql")

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to kevlangat application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});