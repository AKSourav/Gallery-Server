const express=require("express");
const dotenv=require("dotenv");
const connectDB = require("./config/db.js");
const colors = require("colors");
const {notFound,errorHandler} =require('./middleware/errorMiddleware')
const User = require('./models/userModel');
const path= require('path');
const cors=require('cors')

const app=express();
dotenv.config();
connectDB();
app.use(cors({
  origin: '*', // Replace with specific origins or use an array of allowed origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  // allowedHeaders: 'Content-Type,Authorization',
}));

app.use(express.json());

if(process.env.NODE_ENV=='production')
{
  const target=path.resolve(__dirname,'frontend','build','index.html');
  console.log(target)
  app.use(express.static(path.dirname(target)));
  
  app.get('/',(req,res)=>{
      console.log("Production!")
        res.sendFile(target);
    })
}

app.use('/api/users',require('./routes/userRoutes.js'));
app.use('/api/posts',require('./routes/postRoutes.js'));

//error handling for invalid routes
// app.use(notFound);
app.use(errorHandler);
app.use('*',(req,res)=>res.redirect('/'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
