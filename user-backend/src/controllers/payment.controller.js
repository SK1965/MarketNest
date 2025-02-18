const razorpay = require('razorpay');
const crypto = require('crypto');
const ApiResponse = require('../utils/ApiResponse');  // Fix typo (was ApiRespose)
const ApiError = require('../utils/ApiError');

// It's better to store the keys securely in environment variables
const razorpayInstance = new razorpay({
  key_id: "rzp_test_eyzEStwibavLIG",  // Set these in your .env file
  key_secret: "MDLX5QyctfyFjOytUbHZ8Fb2",
});

// Payment route to create an order
const payment = async (req, res) => {
  try {
    const { amount } = req.body; // Amount sent from the client-side

    // Ensure the amount is in the smallest currency unit (e.g., paise or cents)
    const options = {
      amount: amount * 100, // Razorpay expects the amount in the smallest currency unit (paise for INR)
      currency: 'INR',
      receipt: crypto.randomBytes(10).toString('hex'),
    };

    // Create the order using a promise-based approach (instead of callback)
    const order = await razorpayInstance.orders.create(options);

    // Return the response with the created order details
    return res.status(200).json(new ApiResponse(200, order, 'Order Created Successfully'));

  } catch (error) {
    // Handle unexpected errors and return a structured error response
    console.error('Error creating order:', error);
    return res.status(500).json(new ApiError(500, 'Something went wrong while creating the order'));
  }
};

module.exports = { payment };
