require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.DB_HOST}/bookings`);

const bookingsSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  unavailable_dates: Array,
  rating: Number,
  rating_count: Number,
  guest_max: Number,
  cost: Number,
  min_stay: Number,
  max_stay: Number,
  children_allowed: Boolean,
});
const Booking = mongoose.model('Booking', bookingsSchema);

function save(singleBooking) {
  const newBooking = new Booking({
    id: singleBooking.id,
    unavailableDates: singleBooking.unavailable_dates,
    rating: singleBooking.rating,
    numberOfRatings: singleBooking.rating_count,
    guestMax: singleBooking.guest_max,
    cost: singleBooking.cost,
    minStay: singleBooking.min_stay,
    maxStay: singleBooking.max_stay,
    childrenAllowed: singleBooking.children_allowed,
  });
  return newBooking.save();
}

function saveMany(array) {
  return Booking.insertMany(array);
}

function find(id) {
  return Booking.find({ id });
}

module.exports.find = find;
module.exports.booking = Booking;
module.exports.save = save;
module.exports.saveMany = saveMany;
