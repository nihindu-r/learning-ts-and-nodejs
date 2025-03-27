const express = require('express');

const app = express();

const dbConnect = require('./db/dbConnect');
const User = require('./db/userModel');

dbConnect();

// C

const newUser = new User({
    email : 'grace@example.com',
    password : 'password1234'
});


newUser.save()
    .then(() => {
        console.log('User inserted successfully')
    })
    .catch((error) => {
        console.error('Error inserting user: ', error)
    });

// R

    User.find({
        email : 'grace@example.com'
    })
        .then((users) => {
        console.log('User found: ', users)})
        .catch((error) => {
            console.error('Error finding users: ', error)
        });


// User.find()
//     .then((users) => {
//     console.log('User found: ', users)})
//     .catch((error) => {
//         console.error('Error finding users: ', error)
//     });

// U 

User.updateOne({email: 'grace@example.com'},
    {password: 'newpassword123'}
).then(() => {
    console.log('User updated successfully')
}).catch((error) => {
    console.error('Error Updating User: ', error)
});

// User.updateMany({email: 'john2@example.com'},
//     {$set: {password: 'newpassword123'}}
// ).then((result) => {
//     console.log('Documents updated successfully', result)
// }).catch((error) => {
//     console.error('Error Updating User: ', error)
// });

// D

User.deleteOne({email: 'grace@example.com'}).then(
    () =>  {
        console.log('Successfully deleted user')
    })
    .catch((error) => {
        console.error('Error deleting user', error)
    })


// User.deleteMany({password: 'password123'}).then(
//     (result) =>  {
//         console.log('Successfully deleted weak passwords: ', result)
//     })
//     .catch((error) => {
//         console.error('Error deleting user', error)
//     })


// Covered queries - async error handling

User.collection.createIndex({email:6})

User.find({
        email : 'grace@example.com'
    }).select({email:6, _id:0})
        .then((users) => {
        console.log('User found: ', users)})
        .catch((error) => {
            console.error('Error finding users: ', error)
        });

// error handling middleware.
app.use((err, req, res, next) => {
            console.error(err.stack)
            res.status(500).send('Server error')
            next()
          })
          


module.exports = app;


