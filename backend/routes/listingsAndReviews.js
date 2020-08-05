const router = require('express').Router();
const ListingsAndReviews = require('../models/reviews.model');

router.route('/').get((req, res) => {
	ListingsAndReviews.find()
		.then(review => res.json(review))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/sort/reviews').get((req, res) => {
	ListingsAndReviews.find().sort({number_of_reviews: -1})
		.then(review => res.json(review))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/sort/price').get((req, res) => {
	ListingsAndReviews.find().sort({price: 1})
		.then(review => res.json(review))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/sort/priceMin').get((req, res) => {
	ListingsAndReviews.findOne().sort({price: 1})
		.then(review => res.json(review.price))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/sort/priceMax').get((req, res) => {
	ListingsAndReviews.findOne().sort({price: -1})
		.then(review => res.json(review.price))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get/propertyTypes').get((req, res) => {
	ListingsAndReviews.find({}, {property_type: 1})
		.then(review => res.json(review))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/search/:name').get((req, res) => {
	ListingsAndReviews.find(req.params)
		.then(review => res.json(review))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/filter/:lt').get((req, res) => {
	ListingsAndReviews.find({ price : { $lt : req.params.lt}})
		.then(review => res.json(review))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/filter/propertyTypes').get((req, res) => {
	console.log(req.params)
	ListingsAndReviews.find()
		.then(review => res.json(review))
		.catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;