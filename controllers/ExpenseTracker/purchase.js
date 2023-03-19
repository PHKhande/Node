const Razorpay = require('razorpay');
const Order = require('../../models/ExpenseTracker/premiumOrders');

exports.getpurchasePremium = async (req, res, next) => {

    try{
        const rzp = new Razorpay({
            key_id: "rzp_test_9laL1hbVXYouFh",
            key_secret: "TOIG76jQjP8HIyPJrjkwELo7"
        });

        const amount = 2500;
        const order = await rzp.orders.create( {amount, currency: "INR"} );
        await req.user.createOrder({
            orderId: order.id,
            status : 'PENDING'
        });
        res.status(201).json( {order, key_id: rzp.key_id} );
    }
    catch(err){
        res.status(404).json({message:err});
    }
}

exports.postTransactionStatus = async( req, res, next) => {
 
    try{
        const {order_id, payment_id, status} = req.body;
        const singleOrder = await Order.findOne( {where: {orderId: order_id} } );
        await singleOrder.update( {paymentId: payment_id, status: status} );
        if (status === "SUCCESSFUL"){
            await req.user.update({ isPremium: true })
            res.status(202).json( {singleOrder, message: "Transaction Successful"} );
        }
        else{
            res.status(202).json( {singleOrder, message: "Transaction Failed"} );
        }
        
    } 
    catch(err){ 
        res.status(404).json({message:err});
    }
 
}