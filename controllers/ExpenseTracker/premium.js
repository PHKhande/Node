const ExpTrckUser = require('../../models/ExpenseTracker/user');
const Expenses = require('../../models/ExpenseTracker/expenses');

exports.getAllExpensesFromDB = async (req, res, next) => {

    try{
        const LeaderBoard = [];
        const AllUsers = await ExpTrckUser.findAll();
        if (AllUsers.length > 0){
            for (let i = 0; i < AllUsers.length; i++){
                const expenses = await Expenses.findAll({ where: { UserId: AllUsers[i].id } });
                let totalExpense = 0;
                if(expenses.length > 0){
                    for (let j = 0; j < expenses.length; j++){
                        totalExpense += parseInt(expenses[j].amountDB)
                        
                    }
                }
                LeaderBoard.push([AllUsers[i].name, totalExpense]);
            }
        }
        res.status(201).json( {allExpenseDataFromDB:LeaderBoard} ); 

    }

    catch(err){
        console.log(err)
        res.status(404).json({message:err});
    } 
}