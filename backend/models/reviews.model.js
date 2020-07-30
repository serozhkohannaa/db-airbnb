const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
	listing_url: String,
	name: String,
	summary: String,
	space: String,
	description: String,
	neighborhood_overview: String,
	notes: String,
	transit: String,
	access: String,
	interaction: String,
	house_rules: String,
	property_type: String,
	room_type: String,
	bed_type: String,
	minimum_nights: String,
	maximum_nights: String,
	cancellation_policy: String,
	last_scraped: Date,
	calendar_last_scraped: Date,
	first_review: Date,
	last_review: Date,
	accommodates: Number,
	bedrooms: Number,
	beds: Number,
	number_of_reviews: Number,
	bathrooms: Number,
	amenities: Array,
	price: Number,
	security_deposit: Number,
	weekly_price: Number,
	monthly_price: Number,
	cleaning_fee: Number,
	extra_people: Number,
	guests_included: Number,
	images: Array,
	host: Object,
	address: Object,
	review_scores: Object,
	reviews: Array
}, {
	timestamps: true
});

const ListingsAndReviews = mongoose.model('ListingsAndReviews', reviewsSchema);
module.exports = ListingsAndReviews;