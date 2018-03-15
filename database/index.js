const mongoose = require('mongoose');
const data = require('./fakeData.js');

mongoose.connect('mongodb://localhost/bookings');

const bookingsSchema = mongoose.Schema({
  id: Number,
  unavailableDates: Array,
  rating: Number,
  numberOfRatings: Number,
  guestMax: Number,
  cost: Number,
  minStay: Number,
  maxStay: Number,
  childrenAllowed: Boolean
});
const Booking = mongoose.model('Booking', bookingsSchema);

function save(singleBooking) {
  const newBooking = new Booking({
    id: singleBooking.id,
    unavailableDates: singleBooking.unavailable_dates,
    rating: singleBooking.rating,
    numberOfRatings: singleBooking.rating_amount,
    guestMax: singleBooking.guest_max,
    cost: singleBooking.cost,
    minStay: singleBooking.min_stay,
    maxStay: singleBooking.max_stay,
    childrenAllowed: singleBooking.children_allowed
  });
  return newBooking.save();
};

function saveMany(array) {
  return Booking.insertMany(array);
}

function find(id, callback) {
  Booking.find({id : id}, function (err, item){
    callback(item);
  })
}

module.exports.find = find;
module.exports.db = mongoose;
module.exports.booking = Booking;
module.exports.save = save;
module.exports.saveMany = saveMany;
