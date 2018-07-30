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

const extractToken = (req) => (
  req.query.token
);

const authenticatedRoute = ((req, res, next) => {
  const token = extractToken(req);
  if (token) {
    if (token === API_TOKEN) {
      return next();
    } else {
      return res.status(403).json({
        success: false,
        error: 'Invalid token provided',
      });
    }
  } else {
    return res.status(403).json({
      success: false,
      error: 'No token provided. Supply token as query param `token`',
    });
  }
});

app.get('/post/:post', (req, res) => {
  const post = req.params.post;

  const MongoClient = require('mongodb').MongoClient;
  const url = 'mongodb://localhost:27017/blogDB';

  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      const dbo = db.db('blogDB');
      const whereStr = {'id': post};
      dbo.collection("post").findOne(whereStr, function(err, result) {
        if (err) throw err;
        res.setHeader('Cache-Control', 'no-cache');
        res.json(result);
        db.close();
      });
  });
});

app.post('/post', authenticatedRoute, (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const url = 'mongodb://localhost:27017/blogDB';

  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      const dbo = db.db('blogDB');
      let id = '00001';
      dbo.collection("post").find()
      .sort({id: -1}).limit(1)
      .toArray(function(err, result) {
        if (err) throw err;
        if (result.length !== 0) {
          id = result[0].id;
          let incrementvalue = (+id) + 1;
          id = ("00000" + incrementvalue).slice(-5);
        }
        const newPost = {
          title: "点击修改标题",
          date: new Date(),
          url: `/${id}`,
          id: id,
          author: '刘泽宇',
          markdown: '',
          content: '',
          summary: ''
        }
        dbo.collection("post").insert(newPost, function(err, result) {
          if (err) throw err;
          res.setHeader('Cache-Control', 'no-cache');
          res.json(result);
          db.close();
        });
      })
  });
});

app.delete('/post/:post', authenticatedRoute, (req, res) => {
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

app.get('/post', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const url = 'mongodb://localhost:27017/blogDB';

  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      const dbo = db.db('blogDB');
      dbo.collection("post").find().toArray(function(err, result) {
        if (err) throw err;
        res.setHeader('Cache-Control', 'no-cache');
        res.json(result);
        db.close();
      });
  });
});

app.get('/search', (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  const url = 'mongodb://localhost:27017/blogDB';

  const keyword = req.query.keyword;

  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      const dbo = db.db('blogDB');
      const whereStr = { $text: { $search: keyword} }
      dbo.collection("post").find(whereStr).toArray(function(err, result) {
        if (err) throw err;
        res.setHeader('Cache-Control', 'no-cache');
        res.json(result);
        db.close();
      });
  });
});

const API_TOKEN = 'D6W69PRgCoDKgHZGJmRUNA';
const FAKE_DELAY = 500;

app.post('/login', (req, res) => {
  setTimeout(() => (
    res.json({
      success: true,
      token: API_TOKEN,
    })
  ), FAKE_DELAY);
});

app.put('/post/:post', authenticatedRoute, (req, res) => {
  setTimeout(() => {
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
        content: req.body.content,
        summary: req.body.summary,
        text: req.body.text
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
  }, FAKE_DELAY);
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
