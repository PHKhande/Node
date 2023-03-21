const ExpTrckUser = require('../../models/ExpenseTracker/user');
const DownFiles = require('../../models/ExpenseTracker/downloadedfile');

const S3Services = require('../../services/ExpenseTracker/S3Services');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res, next) => {
  try{
    
    const {name, email, password} = req.body;

    if(!name | !email | !password){
      return res.status(500).json({message: 'All fields are mandatory'});
    }
    
    const encryptPass = await bcrypt.hash(password, 10); 
    
    await ExpTrckUser.create({
      name: name,
      email: email,
      password: encryptPass,
      isPremium: false,
      totalExpense: 0
    });

    res.status(201).json({message: 'Successfully created new user'});   
  }

  catch(err){
    console.log(err);
    res.status(500).json({message: "User Already Present"});
  }

}

exports.login = async (req, res, next) => {
  const { loginEmail, loginPassword } = req.body;

  if (!loginEmail || !loginPassword) {
    return res.status(500).json({ message: 'Enter all fields to login' });
  }

  try {
    const availableUser = await ExpTrckUser.findOne({ where: { email: loginEmail } });

    if (!availableUser) {
      throw new Error('User not found');
    }

    const isPasswordMatch = await bcrypt.compare(loginPassword, availableUser.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'User not authorized', success: false });
    }

    res.status(201).json({ message: 'User logged in successfully', success: true, token: generateAccessToken(availableUser.id) });
    
  } 
  
  catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, success: false });
  }

};


function generateAccessToken(id){
  return jwt.sign(id, 'amareshwar');
}



exports.getUserInfo = async (req, res, next) => {

  try{
    const idUser = req.user.id;

    const ourUser = await ExpTrckUser.findByPk(idUser);

    res.status(201).json( {isPremiumMember: ourUser.isPremium}); 
  } 

  catch(err){
    console.log(err);
    res.status(500).json({message: "Error while fetching info. about premium"});
  }

}


exports.downloadExpense = async (req, res, next) => {

  try{
    const expenses = await req.user.getExpenses();
    const stringifiedExpense = JSON.stringify(expenses);
    const userID = req.user.id;
    const fileName = `Expense${userID}/${new Date()}.txt`;
    const fileURL = await S3Services.uploadtoS3(stringifiedExpense, fileName);
    await DownFiles.create( {
      fileurl: fileURL,
      userId : userID
    })
    res.status(200).json({fileURL:fileURL}); 
  }

  catch(err){
    console.log(err);
    res.status(500).json({fileURL:'', err: err}); 
  }

}

exports.downloadExpenseAll = async( req, res, next) => {
  
  try {
    // console.log(req.user);
    // const AllURLs = []
    const AllURLs = await req.user.getDownloadedfiles();
    res.status(200).json({AllURLs:AllURLs}); 

  } catch(err) {
    console.log(err);
    res.status(500).json({fileURL:'', err: err}); 
  }
}

