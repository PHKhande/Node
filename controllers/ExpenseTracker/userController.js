const ExpTrckUser = require('../../models/ExpenseTracker/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res, next) => {
  try{
    const {name, email, password} = req.body;

    if(!name | !email | !password){
      return res.status(500).json({message: 'All fields are mandatory'})
    }
    else{
      const encryptPass = await bcrypt.hash(password, 10); 
      await ExpTrckUser.create({
        name: name,
        email: email,
        password: encryptPass
      });
      res.status(201).json({message: 'Successfully created new user'});   
    }
  } 
  catch(err){
    res.status(500).json({message: "User Already Present"})
  }
}

exports.login = async (req, res, next) => {

  try{
    const findEmail = req.body.loginEmail;
    const findEmailpassword = req.body.loginPassword;
    if(!findEmail | !findEmailpassword){
      return res.status(500).json({message: 'Enter all fields to login'});
    }
    else{
      const availableUsers = await ExpTrckUser.findAll( { where: {email: findEmail} });

      if (availableUsers.length > 0){
        const availableUser = availableUsers[0];
        
        bcrypt.compare(findEmailpassword, availableUser.password, (err, result) => {
          if(err){
            throw new Error("Something went wrong");
          }

          if(result === true){
            res.status(201).json({message: 'User logged in successfully', success: true, token: generateAccessToken(availableUser.id)});
          }
          else{
            res.status(401).json({message: "User not authorized", success: false})
          }
        })
      }
      else{
        throw new Error('User not found')
      }
    }
  }

  catch(err){
    res.status(500).json({message: err, success: false});
  }
}

function generateAccessToken(id){
  return jwt.sign(id, 'amareshwar');
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

