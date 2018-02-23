const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bookings');

let bookingsSchema = mongoose.Schema({
  unavailableDates: Array,
  averageRatings: Number,
  numberOfRatings: Number,
  guestMax: Number,
  cost: Number,
  minStay: Number,
  maxStay: Number,
  childrenAllowed: Boolean
});

let Booking = mongoose.model('Booking', bookingsSchema);


module.exports.db = mongoose;
module.exports = Booking;