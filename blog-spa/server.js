/* eslint-disable no-param-reassign */
const express = require('express');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectID;

const app = express();

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.get('/users/:user/:post', (req, res) => {
  const user = req.params.user;
  const post = req.params.post;

  const MongoClient = require('mongodb').MongoClient;
  const url = 'mongodb://localhost:27017/blogDB';

  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      const dbo = db.db('blogDB');
      const whereStr = {'user': user, 'id': post};
      dbo.collection("post").findOne(whereStr, function(err, result) {
        if (err) throw err;
        res.setHeader('Cache-Control', 'no-cache');
        res.json(result);
        db.close();
      });
  });
});

app.put('/users/:user/:post', (req, res) => {
  const user = req.params.user;
  const post = req.params.post;

  const MongoClient = require('mongodb').MongoClient;
  const url = 'mongodb://localhost:27017/blogDB';

  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    const dbo = db.db("blogDB");
    const whereStr = {"_id": ObjectId(req.body['_id'])};
    const updateObj = {
      title: req.body.title,
      markdown: req.body.markdown,
      content: req.body.content
    }
    const updateStr = {$set: updateObj};
    dbo.collection("post").updateOne(whereStr, updateStr,
     function(err, result) {
        if (err) throw err;
        res.setHeader('Cache-Control', 'no-cache');
        res.json(result);
        db.close();
    });
  });
});

app.delete('/posts/:post', (req, res) => {
  const post = req.params.post;

  const MongoClient = require('mongodb').MongoClient;
  const url = 'mongodb://localhost:27017/blogDB';

  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    const dbo = db.db("blogDB");
    const whereStr = {"_id": ObjectId(post)};
    const updateObj = {
      title: req.body.title,
      markdown: req.body.markdown,
      content: req.body.content
    }
    const updateStr = {$set: updateObj};
    dbo.collection("post").deleteOne(whereStr, updateStr,
     function(err, result) {
        if (err) throw err;
        res.setHeader('Cache-Control', 'no-cache');
        res.json(result);
        db.close();
    });
  });
});

app.get('/users/:user', (req, res) => {
  const user = req.params.user;

  const MongoClient = require('mongodb').MongoClient;
  const url = 'mongodb://localhost:27017/blogDB';

  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      const dbo = db.db('blogDB');
      const whereStr = {'user': user};
      dbo.collection("post").find(whereStr).toArray(function(err, result) {
        if (err) throw err;
        res.setHeader('Cache-Control', 'no-cache');
        res.json(result);
        db.close();
      });
  });
});

// // Make things more noticeable in the UI by introducing a fake delay
// // to logins
// const FAKE_DELAY = 500; // ms
// app.post('/login', (req, res) => {
//   setTimeout(() => (
//     res.json({
//       success: true,
//       token: API_TOKEN,
//     })
//   ), FAKE_DELAY);
// });

// app.get('/products', authenticatedRoute, (req, res) => {
//   fs.readFile(PRODUCT_DATA_FILE, (err, data) => {
//     res.setHeader('Cache-Control', 'no-cache');
//     res.json(JSON.parse(data));
//   });
// });

// app.get('/cart', authenticatedRoute, (req, res) => {
//   fs.readFile(CART_DATA_FILE, (err, data) => {
//     res.setHeader('Cache-Control', 'no-cache');
//     res.json(JSON.parse(data));
//   });
// });

// app.post('/cart', (req, res) => {
//   fs.readFile(CART_DATA_FILE, (err, data) => {
//     const cartProducts = JSON.parse(data);
//     const newCartProduct = {
//       id: req.body.id,
//       title: req.body.title,
//       description: req.body.description,
//       price: req.body.price,
//       image_tag: req.body.image_tag,
//       quantity: 1
//     };
//     let cartProductExists = false;
//     cartProducts.map((cartProduct) => {
//       if (cartProduct.id === newCartProduct.id) {
//         cartProduct.quantity++;
//         cartProductExists = true;
//       }
//     });
//     if (!cartProductExists) cartProducts.push(newCartProduct);
//     fs.writeFile(CART_DATA_FILE, JSON.stringify(cartProducts, null, 4), () => {
//       res.setHeader('Cache-Control', 'no-cache');
//       res.json(cartProducts);
//     });
//   });
// });

// app.post('/cart/delete', (req, res) => {
//   fs.readFile(CART_DATA_FILE, (err, data) => {
//     let cartProducts = JSON.parse(data);
//     cartProducts.map((cartProduct) => {
//       if (cartProduct.id === req.body.id && cartProduct.quantity > 1) {
//         cartProduct.quantity--;
//       } else if (cartProduct.id === req.body.id && cartProduct.quantity === 1) {
//         const cartIndexToRemove = cartProducts.findIndex(cartProduct => cartProduct.id === req.body.id);
//         cartProducts.splice(cartIndexToRemove, 1);
//       }
//     });
//     fs.writeFile(CART_DATA_FILE, JSON.stringify(cartProducts, null, 4), () => {
//       res.setHeader('Cache-Control', 'no-cache');
//       res.json(cartProducts);
//     });
//   });
// });

// app.post('/cart/delete/all', (req, res) => {
//   fs.readFile(CART_DATA_FILE, (err, data) => {
//     let emptyCart = [];
//     fs.writeFile(CART_DATA_FILE, JSON.stringify(emptyCart, null, 4), () => {
//       res.json(emptyCart);
//     });
//   });
// });

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
