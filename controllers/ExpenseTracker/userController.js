const ExpTrckUser = require('../../models/ExpenseTracker/user');

exports.postUserInfo = async (req, res, next) => {
    try{
      if(!req.body.name | !req.body.password | !req.body.email ){
          throw new Error('All fields are mandatory')
      }
    }
    catch{
      res.status(500).json({error: 'All fields are mandatory'})
    }

    try{        
      const name = req.body.name;
      const password = req.body.password;
      const email = req.body.email;
      // console.log(name, password, email)
      const userData = await ExpTrckUser.create({
        name: name,
        email: email,
        password: password
      });
      res.status(201).json({newUserData: userData});
    } 
    catch(err){
      res.status(500).json({error: "User Already Present"})
    }
}

// exports.getUserInfo = async (req, res, next) => {
//     try{
//         const allUsers =   await User.findAll();
//         res.status(201).json({allUsersfromDB: allUsers })
//     }
//     catch(err){
//         res.status(500).json({error: err})
//     }
// }

// exports.deleteUser = async (req, res, next) => {

//     const delId = req.params.deleId;
//     try{
//         const delUser =   await User.destroy( { where: { id:delId } });
//         res.status(201).json({delUserfromDB: delUser })
//     }
//     catch(err){
//         res.status(500).json({error: err})
//     }
// }

