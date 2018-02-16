let express = require('express');
let app = express();
let path = require('path');
let bodyParser = require('body-parser');
let fs = require('fs');
let router = express('router');

app.use(express.urlencoded({extended: false}));
// use bodyParser for urlencoded body loads. we need false for it to work. this will take form post data and make it into an object for us to use on req.body in the route handler.


app.post('/form', (req, res) => {
    fs.writeFile(path.join(__dirname, '../contact.json'), JSON.stringify(req.body), (err) => {
        res.send('Thank you! We promise not to send annoying emails!');
    })
})

app.get('/formsubmissions', (req, res) => {
    fs.readFile(path.join(__dirname, '../contact.json'), function (err, data) {
        res.send(data);
    })
});


//super special middleware logger
// app.use('/', (req, res, next) => {
//     console.log(req.url);
//     next();
// }) this app.will console all of the files in the public folder

// app.get('/order/:name', (req, res) => {
//     let name = req.params.name;
//     let email = req.query.email;
//         res.send(`Your name is ${name} and email is ${email} `);
// });
// params grab from the get('whatever') queries grab from anything after question mark

// app.get('/order/:id', (req, res) => {
//     let id = req.params.id;
//         res.send(id);
// })
//if i type localhost300/order/123, the browser will print 123 since i called id. id could be name, page, whatever. as long as i name it and pass it in, it will print that value.

app.use(express.static(path.join(__dirname, '../public')));
// "use" this middleware as part of the app flow. '.. means ANYTHING in public folder

app.listen(3000, () => {
    console.log('app listening on port 3000');
});