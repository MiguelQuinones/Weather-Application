/* This page will display the temperature and weather icon for the week */

// Import statements
import React, { Component } from 'react';
import "./components.css";

// Main class for fetching weather info from API and displaying it to user
export default class weatherPageWeek extends Component {
   
   // Constructor for the class that handles resetting default values after form submition
   constructor( props ) {
      super( props );

      // Event handling functions
      this.onChangeCityName = this.onChangeCityName.bind( this );
      this.onChangeStateName = this.onChangeStateName.bind( this );
      this.handleSubmitEvent = this.handleSubmitEvent.bind( this );

      // Setting default properties before user input is entered
      this.state = {
         cityName : "",
         stateName : ""
      }
   }

   // Function for when user enters city name into form
   onChangeCityName( event ) {
      this.setState( {
         cityName : event.target.value
      });
   }

   // Function for when user enters state name into form
   onChangeStateName( event ) {
      this.setState( {
         stateName: event.target.value
      });
   }

   // Function for handling event order after form is submitted
   handleSubmitEvent( event ) {
      // Prevents page from reloading immediately after submission
      event.preventDefault();

      // Variable for holding city name entered by user
      var cityName = this.state.cityName;
      var stateName = this.state.stateName;

      // Call function to get weather information for given city 
      getCity( cityName, stateName );

      // Set form back to default values
      this.setState({
         cityName: "",
         stateName: ""
      })
   }

   // Renders the form that the user sees
   render() {
      return (
          <div style={{marginTop: 10}}>
              <h1> Weekly Forecast </h1>
              <form onSubmit={this.handleSubmitEvent}>
                  <div className="enter-field">
                      <label> Enter city: </label>
                      <input type="text" 
                             className="form-control"
                             value={this.state.cityName}
                             onChange={this.onChangeCityName}
                             placeholder="Enter city name here" />
                     <input type="text" 
                             className="form-control"
                             value={this.state.stateName}
                             onChange={this.onChangeStateName}
                             placeholder="Enter state name here" />
                  </div>
                  <div className="submit-field">
                     <input type="submit" value="Submit" className="submit-button" />
                  </div>
                  <div id="mainContainer">
                     <table className="table" style={{marginTop: 20 }}>
                        <thead>
                           <tr>
                              <th> City: </th>
                              <td id="cityCell" colSpan="7"> </td>
                           </tr>
                           <tr>
                              <th> Day: </th>
                              <td id="dayOneCell"> </td>
                              <td id="dayTwoCell"> </td>
                              <td id="dayThreeCell"> </td>
                              <td id="dayFourCell"> </td>
                              <td id="dayFiveCell"> </td>
                              <td id="daySixCell"> </td>
                              <td id="daySevenCell"> </td>
                           </tr>
                           <tr>
                              <th> Temperature: </th>
                              <td id="dayOneTempCell"> </td>
                              <td id="dayTwoTempCell"> </td>
                              <td id="dayThreeTempCell"> </td>
                              <td id="dayFourTempCell"> </td>
                              <td id="dayFiveTempCell"> </td>
                              <td id="daySixTempCell"> </td>
                              <td id="daySevenTempCell"> </td>
                           </tr>
                           <tr>
                              <th> Weather: </th>
                              <td id="dayOneWeatherCell"> </td>
                              <td id="dayTwoWeatherCell"> </td>
                              <td id="dayThreeWeatherCell"> </td>
                              <td id="dayFourWeatherCell"> </td>
                              <td id="dayFiveWeatherCell"> </td>
                              <td id="daySixWeatherCell"> </td>
                              <td id="daySevenWeatherCell"> </td>
                           </tr>
                        </thead>
                     </table>
                  </div>
              </form>
          </div>
      )
  }
}

// Function for fetching information for given city from API -- upload to GitHub when returning unless there's more to add -- nothing more for now at least -- DELETE THIS COMMENT BEFORE UPLOADING
function getCity( city, state ) {
   // Try to send fetch request to openweather API, catch any errors
   try {
      // Create XMLHttpRequest 
      var xhr = new XMLHttpRequest();
      var key = process.env.REACT_APP_API_KEY;

      xhr.open("GET", 
              "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&appid=" + key + "&units=imperial",
              true );

      // Return city information
      xhr.onreadystatechange = function(){
          if(this.readyState === 4 && this.status === 200){
              var json = JSON.parse(this.responseText);
              
              // Display name and state of city to page
              document.getElementById( "cityCell" ).innerHTML = city + ", " + state;

              // Store latitude and longitude of given city
              var lat = json.coord.lat;
              var lon = json.coord.lon;

              // Function that makes call to API for weekly data using latitude and longitude of given city
              weeklyCall( lat, lon );
          }
      }

      // Send out XMLHttpRequest to openweather API
      xhr.send();
   }
   catch( error ) {
      console.log( "An error has occurred!" );
   }
}

function weeklyCall( lat, lon ) {
   // Try to send fetch request to openweather API, catch any errors
   try {
      // Create XMLHttpRequest 
      var xhr = new XMLHttpRequest();
      var key = process.env.REACT_APP_API_KEY;

      // Only want daily weather info, so exclude all other calls
      xhr.open("GET", 
              "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly&appid=" + key + "&units=imperial",
              true );

      // Return city information
      xhr.onreadystatechange = function(){
          if(this.readyState === 4 && this.status === 200){
              var json = JSON.parse(this.responseText);
 
              // Get dates from API and display to page
              document.getElementById( "dayOneCell" ).innerHTML = epochConverter( json.daily[1].dt );
              document.getElementById( "dayTwoCell" ).innerHTML = epochConverter( json.daily[2].dt );
              document.getElementById( "dayThreeCell" ).innerHTML = epochConverter( json.daily[3].dt );
              document.getElementById( "dayFourCell" ).innerHTML = epochConverter( json.daily[4].dt );
              document.getElementById( "dayFiveCell" ).innerHTML = epochConverter( json.daily[5].dt );
              document.getElementById( "daySixCell" ).innerHTML = epochConverter( json.daily[6].dt );
              document.getElementById( "daySevenCell" ).innerHTML = epochConverter( json.daily[7].dt );

              // Get temperatures from API for given days and display to page
              document.getElementById( "dayOneTempCell" ).innerHTML = json.daily[1].temp.day + "°F";
              document.getElementById( "dayTwoTempCell" ).innerHTML = json.daily[2].temp.day + "°F";
              document.getElementById( "dayThreeTempCell" ).innerHTML = json.daily[3].temp.day + "°F";
              document.getElementById( "dayFourTempCell" ).innerHTML = json.daily[4].temp.day + "°F";
              document.getElementById( "dayFiveTempCell" ).innerHTML = json.daily[5].temp.day + "°F";
              document.getElementById( "daySixTempCell" ).innerHTML = json.daily[6].temp.day + "°F";
              document.getElementById( "daySevenTempCell" ).innerHTML = json.daily[7].temp.day + "°F";

              // Get weather icons from API for given days and display to page
              document.getElementById( "dayOneWeatherCell" ).innerHTML = '<img src="http://openweathermap.org/img/wn/' + json.daily[1].weather[0].icon + '@2x.png" />';
              document.getElementById( "dayTwoWeatherCell" ).innerHTML = '<img src="http://openweathermap.org/img/wn/' + json.daily[2].weather[0].icon + '@2x.png" />';
              document.getElementById( "dayThreeWeatherCell" ).innerHTML = '<img src="http://openweathermap.org/img/wn/' + json.daily[3].weather[0].icon + '@2x.png" />';
              document.getElementById( "dayFourWeatherCell" ).innerHTML = '<img src="http://openweathermap.org/img/wn/' + json.daily[4].weather[0].icon + '@2x.png" />';
              document.getElementById( "dayFiveWeatherCell" ).innerHTML = '<img src="http://openweathermap.org/img/wn/' + json.daily[5].weather[0].icon + '@2x.png" />';
              document.getElementById( "daySixWeatherCell" ).innerHTML = '<img src="http://openweathermap.org/img/wn/' + json.daily[6].weather[0].icon + '@2x.png" />';
              document.getElementById( "daySevenWeatherCell" ).innerHTML = '<img src="http://openweathermap.org/img/wn/' + json.daily[7].weather[0].icon + '@2x.png" />';
          }
      }

      // Send out XMLHttpRequest to openweather API
      xhr.send();
   }
   catch( error ) {
      console.log( "An error has occurred!" );
   }
}

// Function for converting given epoch time to a readable date
function epochConverter( epochTime ) {
   // Multiply given epochTime by 1,000 because Date object uses milliseconds
   var readableDate = new Date( epochTime * 1000 );
   // Split date object on white space 
   var date = readableDate.toString().split(/\s+/);
   console.log( date );
   // Display only day, month, date, and year
   return date[0] + " " + date[1] + " " + date[2] + ", " + date[3];
}


