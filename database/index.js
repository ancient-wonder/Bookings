const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bookings');
const data = require('../fakeData.js');
let bookingsSchema = mongoose.Schema({
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

let Booking = mongoose.model('Booking', bookingsSchema);

//{"id":2,"unavailable_dates":["5/19/2018","3/8/2018","4/14/2018","3/7/2018","4/11/2018","5/23/2018","5/4/2018","4/2/2018","5/18/2018","4/17/2018","5/20/2018","3/15/2018","3/9/2018","5/12/2018","3/12/2018","5/26/2018","3/7/2018","3/4/2018","3/17/2018","5/28/2018","3/14/2018","3/27/2018","4/9/2018","3/13/2018","5/23/2018","5/17/2018","4/20/2018","3/26/2018","5/18/2018","5/5/2018","3/28/2018","3/1/2018","5/8/2018","4/9/2018"],
//"rating":5,"rating_amount":17,"guest_max":3,"cost":261,"min_stay":1,"max_stay":28,"children_allowed":true},
const save = (singleBooking, callback) => {
//{"id":2,"unavailable_dates":["9/19/2017","9/1/2017","3/24/2017","9/26/2017","10/12/2017","8/2/2017","11/4/2017","5/29/2018","7/9/2017"],"average_ratings":2,"guest_max":2,"cost":202,"min_stay":1,"max_stay":1,"children_allowed":true},
  const newBooking = new Booking({
    id: singleBooking.id,
    unavailableDates: singleBooking.unavailable_dates,
    rating: singleBooking.rating,
    numberOfRatings: singleBooking.rating_amount,
    guestMax: singleBooking.guest_max,
    cost: singleBooking.cost,
    minStay: singleBooking.min_stay,
    maxStay: singleBooking.max_stay,
    maxStay: singleBooking.children_allowed
  });
    newBooking.save(function (err, fluffy) {
    if (err) {
      console.error(err);
    } else {
      console.log('successfully saved');
    }
    })


  };



const other = () => {
  for (var i = 0; i < data.length; i++) {
    save(data[i]);
  }
}
other();

module.exports.db = mongoose;
module.exports = Booking;
module.exports = save;