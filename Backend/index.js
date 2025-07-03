const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter= require('./Routes/ProductRouter')
//const noteRouter = require('./Routes/note.router')

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8000;

// app.get('/ping',(req,res)=>{
//     res.send('PONG');
// });

app.get('/', (req, res) => {
    return res.json({
        message: "Hi welcome there, this is my node js project!!"
    })
})

app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);
//app.use('/note', noteRouter);

app.listen(PORT, ()=>{
      console.log(`Server is listening on http://localhost:${PORT}`);
})