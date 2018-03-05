import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styled from 'styled-components';
import Calendar from './components/Calendar.js';
import Ratings from './components/Ratings.js';
import Guests from './components/Guests.js';
import MdClear from 'react-icons/lib/md/clear';
import BookingPrices from './components/BookingPrices.js';
import ReactRouter, { Route, BrowserRouter as Router } from 'react-router-dom';

class Bookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data : {"id":1,"unavailable_dates":["3/27/2018","3/7/2018","5/26/2018","3/3/2018","4/10/2018","4/23/2018","4/16/2018","4/22/2018","3/31/2018","4/2/2018","2/25/2018","5/10/2018","5/24/2018","4/8/2018","5/18/2018","3/21/2018","4/9/2018","2/25/2018","5/21/2018","5/3/2018","5/23/2018","3/13/2018","3/16/2018","4/17/2018","5/25/2018","4/9/2018","5/19/2018","4/30/2018","3/13/2018","4/1/2018","5/14/2018","4/8/2018","3/12/2018"],"rating":3,"rating_amount":81,"guest_max":4,"cost":187,"min_stay":3,"max_stay":25,"children_allowed":true},
      invalidDate: false,
      readyToBook: false,
      booked: 'Book'
    }
    this.handleInvalidDates = this.handleInvalidDates.bind(this);
    this.handleBook = this.handleBook.bind(this);
  }
  handleInvalidDates (option) {
    //console.log('date is invalid')
    if(option === true){
      console.log('not ready to book')
      this.setState(function(){
        return {
          invalidDate: true,
          readyToBook: false,
        }
      })
    } else {
      console.log('ready to book')
      this.setState(function(){
        return {
          invalidDate: false,
          readyToBook: true,
        }
      })
    }
  }
  handleBook () {
    console.log('booked has ran');
    this.setState(function() {
      return {
        booked: 'Room has been booked',
      }
    })
  }
  render () {
    const Bookings = styled.div`
      width: 396px;
      height: 329px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    `;
    const Exit = styled.h1`
      margin: 10px;
      height: 38px;
      width: 40px;
      font-size: 30px;
      color: #878787;
      align-self: flex-start;
      margin-left: 20px;
      text-align: center;
      &:hover {
        border-color: #e5e5e5;
        border-radius: 55%;
        border-style: solid;
      }
    `;


    const Price = styled.div`
      font-family: 'Quicksand', sans-serif;
      width: 300px;
      height: 70px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    `;
    const Amount = styled.div`
      font-size: 1.5em;
      color: #4c4c4c;
      align-self: flex-start;
      font-weight: bolder;
      display: flex;
      align-items: center;
    `;
    const Night = styled.div`
     font-family: 'Quicksand', sans-serif;
     color: grey;
     font-size: 13px;
    `;
    const Book = styled.button`
      font-size: 1.3em;
      background-color: #ff2f51;
      color: white;
      border-radius: 5px;
      width: 300px;
      height: 50px;
      z-index: -1;
    `;
    const Fake = styled.div`

      height: 50px;
      width: 50px;
    `;
    const InvalidBook = Book.extend `

    `;
    const Line = styled.div`
      height: 20px;
      width: 300px;
      border-width: 1px;
      border-style: solid;
      border-color: #dbdbdb;
      border-right: none;
      border-left: none;
      border-bottom: none;
    `;
    const BookingOptions = styled.div`
      display: flex;
      justify-content: space-between;
      width: 350px;
    `;

    return (
      <Bookings>

        <Price>
          <Amount>
            ${this.state.data.cost}
            <Night>  per night </Night>
          </Amount>
          <Ratings ratingAmount={this.state.data.rating_amount} stars={this.state.data.rating}/>
        </Price>
        <Line/>
        <BookingOptions>
        <Calendar handleInvalidDates={this.handleInvalidDates}/>
        <Guests children_allowed={this.state.data.children_allowed} guest_max={this.state.data.guest_max}/>
        </BookingOptions>
        {this.state.invalidDate === false ? <Book onClick={this.handleBook}> {this.state.booked}</Book> : <InvalidBook> Dates not available</InvalidBook>}
        <Fake onClick={this.handleBook}> </Fake>
      </Bookings>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Bookings} />
        </div>
      </Router>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));