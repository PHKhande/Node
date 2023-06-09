const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const errorController = require('./controllers/error');
const sequelize = require('./util/ExpenseTracker/database');

// const sequelize = require('./util/database');
// const Product = require('./models/product');
// const User = require('./models/user');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');
const Expense = require('./models/ExpenseTracker/expenses');
const ExpUser = require('./models/ExpenseTracker/user');
const PremOrder = require('./models/ExpenseTracker/premiumOrders');
const ForgotPasswordRequest = require('./models/ExpenseTracker/forgotPassword');
const DownloadedFile = require('./models/ExpenseTracker/downloadedfile');

const app = express();

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', 'views');

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/ExpenseTracker/user');
const expenseRoutes = require('./routes/ExpenseTracker/expenses');
const purchaseRoutes = require('./routes/ExpenseTracker/purchase');
const premiumRoutes = require('./routes/ExpenseTracker/premium');

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findByPk(1)
//     .then(user => {
//       req.user = user;
//       next();
//     })
//     .catch(err => console.log(err));
// });

// app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use('/', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumRoutes);


app.use(errorController.get404);

Expense.belongsTo(ExpUser, { constraints: true, onDelete: 'CASCADE' });
ExpUser.hasMany(Expense);
PremOrder.belongsTo(ExpUser, { constraints: true, onDelete: 'CASCADE' });
ExpUser.hasMany(PremOrder);
ForgotPasswordRequest.belongsTo(ExpUser, { constraints: true, onDelete: 'CASCADE' });
ExpUser.hasMany(ForgotPasswordRequest);
DownloadedFile.belongsTo(ExpUser, { constraints: true, onDelete: 'CASCADE' });
ExpUser.hasMany(DownloadedFile);

// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });

sequelize
  .sync()
  // .sync({force: true})
  .then( result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

// sequelize
//   .sync()
//   .then(result => {
//     return User.findByPk(1);
//   })
//   .then(user => {
//     if (!user) {
//       return User.create({ name: 'Max', email: 'test@test.com' });
//     }
//     return user;
//   })
//   .then(user => {
//     return user.createCart();
//   })
//   .then(cart => {
//     app.listen(3000);
//   })
//   .catch(err => {
//     console.log(err);
//   });