const Expenses = require('../../models/ExpenseTracker/expenses');
const ExpUser = require('../../models/ExpenseTracker/user');

exports.getAllExpenses = async (req, res, next) => {
  try{

      const AllExpenses = await req.user.getExpenses();
      // console.log(AllExpenses);
      res.status(201).json( {message: "Successfully extracted", allExpenseData:AllExpenses, success:true}); 
  } 
  catch(err){
    // console.log(err);
    res.status(500).json({message: "Error while fetching already present expenses", success:false})
  }
}

exports.postExpense = async (req, res, next) => {
  try{
    const {amount, category, description} = req.body;
    const idUser = req.user.id;
    if(!amount | !category | !description){
      return res.status(500).json({message: 'All fields are mandatory'})
    }
    else{
      const user = await ExpUser.findOne( {where: {id: idUser}} );
      const newtotalExpense = parseInt(user.totalExpense) + parseInt(amount);
      await user.update({ totalExpense: newtotalExpense });
      const data = await Expenses.create({
        amountDB: amount,
        categoryDB: category,
        descriptionDB: description,
        userId: idUser
      });
      res.status(201).json({newExpenseData: data});
    }
  } 
  catch(err){
    res.status(500).json({error: err})
  }
}

exports.delExpense = async (req, res, next) => {
    
    try{
      const deleteId = req.params.delId;
      const idUser = req.user.id;

      const negExpense = await Expenses.findOne( { where: { id:deleteId, userId:idUser } });
      const negExpenseAmt = negExpense.amountDB;

      const delExpense = await Expenses.destroy( { where: { id:deleteId, userId:idUser } });

      const user = await ExpUser.findOne( {where: {id: idUser}} );
      const newtotalExpense = parseInt(user.totalExpense) - parseInt(negExpenseAmt);
      await user.update({ totalExpense: newtotalExpense });

      res.status(201).json({delUserfromDB: delExpense })


    }
    catch(err){
      res.status(500).json({error: err})
    }
}
