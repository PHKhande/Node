const Expenses = require('../../models/ExpenseTracker/expenses');

exports.getAll = async (req, res, next) => {
  try{

      const AllUsers = await Expenses.findAll();
      res.status(201).json( {message: "Successfully extracted", allExpenseData:AllUsers}); 
  } 
  catch(err){
    res.status(500).json({message: "Error while fetching already present expenses"})
  }
}

exports.postExpense = async (req, res, next) => {
  try{
    const {amount, category, description} = req.body;
    console.log(amount, category, description)
    if(!amount | !category | !description){
      return res.status(500).json({message: 'All fields are mandatory'})
    }
    else{
      const data = await Expenses.create({
        amountDB: amount,
        categoryDB: category,
        descriptionDB: description
      });
      res.status(201).json({newExpenseData: data});
    }
  } 
  catch(err){
    res.status(500).json({error: err})
  }
}

exports.delExpense = async (req, res, next) => {
    const deleteId = req.params.delId;
    try{
        const delUser =   await Expenses.destroy( { where: { id:deleteId } });
        res.status(201).json({delUserfromDB: delUser })
    }
    catch(err){
        res.status(500).json({error: err})
    }
}
