import React from 'react';
import styled from 'styled-components';
import Calendar from './Calendar.jsx';
import Ratings from './Ratings.jsx';
import Guests from './Guests.jsx';
import MdClear from 'react-icons/lib/md/clear';
import BookingPrices from './BookingPrices.jsx';
import axios from 'axios';
import moment from 'moment';

const BookingsMain = styled.div`
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
  width: 300px;
`;
const BookMain = styled.div`
`;

export default class Bookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data : null,
      invalidDate: false,
      readyToBook: false,
      booked: 'Book',
      renderBook: true,
    }
    this.handleInvalidDates = this.handleInvalidDates.bind(this);
    this.handleBook = this.handleBook.bind(this);
    this.fetchInfo = this.fetchInfo.bind(this);
    this.handleGuest = this.handleGuest.bind(this);
    this.toggleBook = this.toggleBook.bind(this);
  }
  componentDidMount() {
    this.fetchInfo();
  }

  toggleBook() {
    if(this.state.renderBook === true){
      this.setState(function(){
        return {
          renderBook : false
        }
      })
    } else {
      this.setState(function(){
        return {
          renderBook : true
        }
      })
    }
  }
  fetchInfo() {
    let id = this.props.itemid;
    axios.get(`http://localhost:3002/api/bookings/${id}`)
      .then((response) => {
        this.setState(() => ({ data: response.data[0] }));
      })
      .catch(error => (console.log('error', error)));
  }

  handleInvalidDates (option) {
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

  handleGuest(adultAmount) {
    if(adultAmount >= 1) {
      this.setState(function () {
        return {
          guestReady: true
        }
      })
    }
  }

  handleBook() {
    console.log('booked has ran');
    if(this.state.invalidDate === false && this.state.guestReady === true){
      this.setState(function() {
        return {
          booked: 'Room has been booked',
        }
      })
    }
  }

  render () {
    if(this.state.data === null) {
      return <div>loading....</div>;
    }
    return (
      <BookingsMain>
        <Price>
          <Amount>
            ${this.state.data.cost}
            <Night>  per night </Night>
          </Amount>
          <Ratings ratingAmount={this.state.data.numberOfRatings} stars={this.state.data.rating}/>
        </Price>
        <Line/>
        <BookingOptions>
        <Calendar handleInvalidDates={this.handleInvalidDates} unavailableDates={this.state.data.unavailable_dates}/>
        <Guests children_allowed={this.state.data.childrenAllowed} guest_max={this.state.data.guestMax} handleGuest={this.handleGuest} toggleBook={this.toggleBook}/>
        </BookingOptions>
        <Fake onClick={this.handleBook}></Fake>
        {this.state.renderBook === true
          ? <BookMain>
              {this.state.invalidDate === false ? <Book onClick={this.handleBook}> {this.state.booked}</Book> : <InvalidBook> Dates not available</InvalidBook>}
            </BookMain>
          : null
        }
      </BookingsMain>
    )
  }
}
