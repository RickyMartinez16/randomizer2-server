const express = require('express');
const { Sequelize, DataTypes} = require('sequelize');

// Sequelize configuration
const sequelize = new Sequelize('gymbuddy', 'user', 'password', {
    host: 'db',
    dialect: 'postgres'
});

// Define Exercise model
const Exercise = sequelize.define('Exercise', {
    // Model attributes are defined here
    muscleGroup: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Other model options go here
});

// Define the User model
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

// Sync all models with the database
sequelize.sync()
    .then(() => {
        console.log('All models synced successfully.');
    })
    .catch(err => {
        console.error('Error syncing models:', err);
    });

// Express app initialization
const app = express();
app.use(express.json());

// Example data for exercises
const exercises = [{
    "muscleGroup": "arms",
    "exercise": "curls",
    "link": "youtube.com",
    "description": "lift dumbbells to get chicks"
},
{
    "muscleGroup": "legs",
    "exercise": "squats",
    "link": "youtube.com",
    "description": "big meaty thighs"
},
{
    "muscleGroup": "chest",
    "exercise": "bench press",
    "link": "youtube.com",
    "description": "chest day is the best day"
},
{
    "muscleGroup": "shoulders",
    "exercise": "shoulder press",
    "link": "youtube.com",
    "description": "shoulder boulders"
},
{
    "muscleGroup": "back",
    "exercise": "lat pull down",
    "link": "youtube.com",
    "description": "gives you wings so you can fly"
},
{
    "muscleGroup": "core / cardio",
    "exercise": "planks",
    "link": "youtube.com",
    "description": "one day you will have a 6 pack I promise"
}];

// Routes-------------------------------------------------------------

// Default route
app.get('/', (req, res) => {
    res.send({"message": "hello, world"});
});

// Route to get exercises based on muscle group
app.get('/:muscleGroup', async (req, res) => {
    const muscleGroup = req.params.muscleGroup;
    const exercisesForMuscleGroup = await Exercise.findAll({
        where: {
            muscleGroup: muscleGroup
        }
    });
    res.send(exercisesForMuscleGroup);
});

// Route to create a new user
app.post("/users", async(req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const is_admin = false;

    const obj = {
        first_name,
        last_name,
        email,
        username,
        password,
        is_admin
    };

    const user = await User.create(obj);
    res.send(user);
});

// Route to create a new exercise
app.post("/exercises", async(req, res) => {
    const user_id = parseInt(req.get("user_id"), 10);
    const user = await User.findOne({
        where: {
            id: user_id
        }
    });

    if(!user.is_admin){
        res.status(401).send();
    }

    const obj = {
        muscleGroup: req.body.muscleGroup,
        name: req.body.name,
        link: req.body.link,
        description: req.body.description
    };
    
    const exercise = await Exercise.create(obj);

    res.send(exercise);
});

// Start the server
app.listen(3000, () => console.log('Example app is listening on port 3000.'));
