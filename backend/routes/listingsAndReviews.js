const router = require('express').Router();
const ListingsAndReviews = require('../models/reviews.model');

router.route('/').get((req, res) => {
	ListingsAndReviews.find()
		.then(review => res.json(review))
		.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;