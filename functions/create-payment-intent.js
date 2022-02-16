// domain/.netlify/functions/create-payment-intent

//dotenv package helps us access react env vars in node land
//this only gets them if envs vars are in the root
require('dotenv').config()

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY)
exports.handler = async function(event, context) {
	//console.log(event)
	//event.httpMethod === 'POST'
	if(event.body) {
		const {cart, shipping_fee, total_amount } = JSON.parse(event.body)
		//calculate order amount (totals) for stripe
		//this func would normally talk to our own backend(security purposes) for totals but since we are using serverless function we arent doing that.
		const calculate = () => {
			return shipping_fee + total_amount
		}

		//connect to stripe to pass totals
		try {
			//paymentIntent = will contain what we get back from stripe after sending them total info, and we get client_secret fromt them for auth in body below
			const paymentIntent = await stripe.paymentIntents.create({
				amount: calculate(),
				currency: 'usd'
			})
			// what we are returning from this serverless function(create-payment-intent.js)  to our ui (stripeCheckout) 
			return {
				statusCode: 200,
				body: JSON.stringify({clientSecret: paymentIntent.client_secret})
			}
		} catch (error) {
			return {
				statusCode: 500,
				body: JSON.stringify({ msg: error.message })
			}
		}
	//console.log(cart) 
		return {
			statusCode: 200,
			body: JSON.stringify(cart)
		}
	}
	return { statusCode: 405, body: 'Only POST Requests Allowed' }
}