const ExpTrckUser = require('../../models/ExpenseTracker/user');
const Expenses = require('../../models/ExpenseTracker/expenses');
const sequelize = require('../../util/ExpenseTracker/database');

exports.getAllExpensesFromDB = async (req, res, next) => {

    try{
        const leaderBoard = await ExpTrckUser.findAll( {
            attributes: [
                'name',
                'totalExpense'],
            group: ['user.id'],
            order: [[sequelize.literal('totalExpense'), 'DESC']]
        })
        res.status(201).json( {allExpenseDataFromDB:leaderBoard} ); 
    }

    catch(err){
        console.log(err)
        res.status(404).json({message:err});
    } 
}