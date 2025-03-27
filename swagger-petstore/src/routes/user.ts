import express from "express";



const userRouter = express.Router();
const userLoginRouter = express.Router();
const userLogoutRouter = express.Router();
const userArrayCreate = express.Router();
const userListCreate = express.Router();


export {userRouter, userLoginRouter, userLogoutRouter, userArrayCreate, userListCreate}; 