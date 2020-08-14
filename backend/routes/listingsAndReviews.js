const router = require('express').Router();
const ListingsAndReviews = require('../models/reviews.model');

const nPerPage = 10;
let currentPage = 1;

router.route('/loadMore').get((req, res) => {
	currentPage = currentPage + 1;
	ListingsAndReviews.find()
		.then(review => res.json(review))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get((req, res) => {
	ListingsAndReviews.find()
		// .skip(currentPage > 0 ? ((currentPage - 1) * nPerPage) : 0)
		.limit(nPerPage * currentPage)
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

router.route('/get/cancellation_policy').get((req, res) => {
	ListingsAndReviews.find({}, {cancellation_policy: 1})
		.then(review => res.json(review))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/search/:name').get((req, res) => {
	ListingsAndReviews.find(req.params)
		.then(review => res.json(review))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/filter/:price&:property_type&:cancellation_policy&:review_scores_value').get((req, res) => {
	let highScoreValue = req.params.review_scores_value == true ? 8 : 1;

	ListingsAndReviews.find({
		price: {$lt: req.params.price},
		property_type: req.params.property_type.split(','),
		cancellation_policy: req.params.cancellation_policy.split(','),
		"review_scores.review_scores_value": {$gt: highScoreValue}
	})
		.then(review => res.json(review))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
	ListingsAndReviews.findById(req.params.id)
		.then(reviews => {
			reviews.reviews = [
				{
					_id: req.body._id,
					reviewer_name: req.body.reviewer_name,
					reviewer_id: req.body.reviewer_id,
					listing_id: req.params.id,
					comments: req.body.comments
				},
				...reviews.reviews
			]

			reviews.save()
				.then(() => res.json('Comment upd!'))
				.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/deleteComment/:id').post((req, res) => {
	ListingsAndReviews.findById(req.params.id)
		.then(review => {
			review.reviews = review.reviews.filter(item => {
				return item._id !== req.body._id
			})

			review.save()
				.then(() => res.json('Comment updated!'))
				.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;