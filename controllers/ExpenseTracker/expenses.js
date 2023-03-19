const Expenses = require('../../models/ExpenseTracker/expenses');

exports.getAll = async (req, res, next) => {
  try{

      const AllUsers = await Expenses.findAll();
      res.status(201).json( {message: "Successfully extracted", newExpenseData:AllUsers}); 
  } 
  catch(err){
    res.status(500).json({message: "Error while fetching already present expenses"})
  }
}

exports.postExpense = async (req, res, next) => {

  try{
    const {amount, category, description} = req.body;

    if(!amount | !category | !description){
      return res.status(500).json({message: 'All fields are mandatory'})
    }
    else{
      const data = await Expense.create({
        expAmt: expAmt,
        category: category,
        desc: desc
      });
      res.status(201).json({newExpenseData: data});
    }
  } 
  catch(err){
    res.status(500).json({error: err})
  }
}
