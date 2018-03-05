import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
//import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Dates = styled.div`
  font-size: 12px;
  color: grey;
  font-family: 'Quicksand', sans-serif;
  margin-left: 15px;
`;

class Calendar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment(),
      unavailbleDates: [],
      excludeDates: [moment().add(1, "days"), moment().add(3, "days")],
    };
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.checkChangeEnd = this.checkChangeEnd.bind(this);
    this.populateUnavailableDates = this.populateUnavailableDates.bind(this);
    this.checkChangeStart = this.checkChangeStart.bind(this);
    this.handleRight = this.handleRight.bind(this);
  }
  componentDidMount () {
    this.populateUnavailableDates();
  }
  populateUnavailableDates () {

  }
  handleChangeStart(date) {
    this.setState({
      startDate: date
    });

  }
  checkChangeEnd (date) {
    var fromDate = this.state.startDate;
    var newDate = fromDate;
     var toDate = date;
     var count = 0;
     var validDate = true
     while(fromDate < toDate){
      for(var i = 0; i < this.state.excludeDates.length; i++){
        if(JSON.stringify(fromDate._d) === JSON.stringify(this.state.excludeDates[i]._d)){
          validDate = false
          console.log('not valid dates');
          this.props.handleInvalidDates(true);
        }
      }
      fromDate = fromDate.add(1, 'days');
      count++;
     }
      if(validDate === false){
        fromDate = fromDate.subtract(count, 'days');
      }

      console.log(fromDate)
      //this.props.handleInvalidDates(validDate);
      console.log('this ran')

      // if(validDate === true){
      //   this.setState(({name : 'jordyn'}))
      //   // this.setState(function(item){
      //   //   return {
      //   //     startDate : fromDate,
      //   //     endDate: date
      //   //   }
      //   // })
      //   this.handleRight();
      // }
    //   console.log('this should run once')
      //this.props.handleInvalidDates(false);
  }
  handleRight () {
    console.log('hhiii');
    this.props.handleInvalidDates();
  }

   checkChangeStart (date) {
    // if(this.state.endDate){
    // var fromDate = date;
    //  var toDate = this.state.endDate;
    //  var validDate = true
    //  while(fromDate < toDate){
    //   for(var i = 0; i < this.state.excludeDates.length; i++){
    //     if(JSON.stringify(fromDate._d) === JSON.stringify(this.state.excludeDates[i]._d)){
    //       validDate = false
    //     }
    //   }
    //   fromDate = fromDate.add(1, 'days');
    //  }
    //  if(fromDate > toDate) {
    //    validDate = false;
    //  }
    //  if(validDate === true){
    //    this.handleChangeStart(date);
    //  }
    // } else {
    //    if(fromDate > toDate) {
    //    validDate = false;
    //  }
    //  if(validDate === true){
    //    this.handleChangeStart(date);
    //  }

    // }
   }
  handleChangeEnd(date) {
    this.setState({
      endDate: date
    });
    setTimeout(this.checkChangeEnd(date), 1000)

  }

  render() {

    return (
      <div>
        <Dates> Dates </Dates>
        <DatePicker
          selected={this.state.startDate}
          selectsStart
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeStart}
          excludeDates={this.state.excludeDates}
          minDate={moment()}
          maxDate={moment().add(3, "months")}
        />
        <DatePicker
          selected={this.state.endDate}
          selectsEnd
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeEnd}
          minDate={moment().add(1, "days")}
          excludeDates={this.state.excludeDates}
          maxDate={moment().add(3, "months")}
        />
      </div>
  )}
}

export default Calendar;



// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
