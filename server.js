const express =require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const passport =require('passport');


const users=require('./routes/api/users');
const profile=require('./routes/api/profile');
const posts=require('./routes/api/posts');

const app =express();
//body Parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// DB config
db=require('./config/keys').mongodbURL;
mongoose.connect(db)
.then(()=>console.log('MongoDB connected'))
.catch(err=>console.log(err));

//passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);
//use Routes
app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);

const port =process.env.PORT || 5000;

app.listen(port,()=> console.log(`Sever running on port ${port}`));