import React from 'react';
import styled from 'styled-components';


class BookingPrices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starsArr : []
    };
  }
  render (props) {
     const Main = styled.div`
       height: 20px;
       width: 100px;
       display: flex;
       align-items: flex-end;
       justify-content: flex-start;
       font-family: 'Quicksand', sans-serif;

     `;

    return (
      <Main>

      </Main>
    )
  }
}

export default BookingPrices;