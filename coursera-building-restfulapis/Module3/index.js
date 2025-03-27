const express = require('express');
const passport = require('passport'); //authentication middleware
const passportJWT = require('passport-jwt'); //implementing jwt strategy
const jwt = require('jsonwebtoken'); //jsonwebtoken for verifying jwt.

const app = express();


const fakesecretKey = 'your_secret_key';

app.use(express.json());

app.use(passport.initialize());

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const users = [
    {id:1, username:'admin', password:'pwd180'},
    {id:1, username:'admin2', password:'pwd'}
]

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: fakesecretKey
}, (jwtpayload, done) => {

    const user = users.find((u) => {u.id===jwtpayload.sub})

    if (user){
        console.log('user found')
        return done(null,user)
    }
    else{
        console.log('no user found')
        return done(null,false)
    }
}))

app.post('/login', (req, resp) => {
    const {id,username,password} = req.body
    console.log(req.body);
    console.log(username);
    console.log(password);
    const user = users.find((u) => u.username === username && u.password === password)

    if(user){
        const payload = {sub: user.id, username: user.username}
        const token = jwt.sign(payload, fakesecretKey)
        resp.json({token:token})
    } else {
        resp.status(401).json({message: 'Auth failed'})
    }
});

app.get('/protected', passport.authenticate('jwt',{session : false}), (req,res) => {
    res.json({message: 'Protected route accessed'})
})

app.listen(8080, () => {
    console.log('Server running on port 8080')
}
)