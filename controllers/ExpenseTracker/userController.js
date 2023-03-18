const ExpTrckUser = require('../../models/ExpenseTracker/user');

exports.postUserInfo = async (req, res, next) => {
  try{
    if(!req.body.name | !req.body.password | !req.body.email ){
        throw new Error('All fields are mandatory')
    }
  }
  catch{
    return res.status(500).json({error: 'All fields are mandatory'})
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

exports.loginUserInfo = async (req, res, next) => {
  const findEmail= req.body.loginEmail;
  const findEmailpassword = req.body.loginPassword;
  try{
    const availableUsers =   await ExpTrckUser.findAll( { where: {email: findEmail} });

    if (availableUsers.length > 0){
      const availableUser = availableUsers[0];

      if (availableUser.password === findEmailpassword){
        res.status(201).json({availableUserDB: availableUser })
      }
      else{
        res.status(401).json({error: "User not authorized" })
      }
    }
    else{
      throw new Error('User not found')
    }
    
  }
  catch(err){
    err = "User not found";
    res.status(500).json({error: err});
  }
}

// exports.deleteUser = async (req, res, next) => {

//     const delId = req.params.deleId;
//     try{
//         const delUser =   await ExpTrckUser.destroy( { where: { id:delId } });
//         res.status(201).json({delUserfromDB: delUser })
//     }
//     catch(err){
//         res.status(500).json({error: err})
//     }
// }

