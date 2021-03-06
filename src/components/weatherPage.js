/* This page will display the main info of the application for the current time -- that is, 
   the weather for a given city, its temperature, wind speed, and more
*/

// Import statements
import React, { Component } from 'react';
import "./components.css";

// Main class for fetching weather info from API and displaying it to user
export default class weatherPage extends Component {
   
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
      getWeatherForCity( cityName, stateName );

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
              <h1> Daily Forecast </h1>
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
                              <td id="cityCell" colSpan="6"> </td>
                           </tr>
                           <tr>
                              <th> Weather </th>
                              <th> Temperature </th>
                              <th> Humidity </th>
                              <th> Wind </th>
                              <th> Feels Like </th>
                              <th> Pressure </th>
                              <th> Visibility </th>
                           </tr>
                           <tr>
                              <td id="imageId" rowSpan="2"> </td>
                              <td id="tempCell" >  </td>
                              <td id="humidityCell" > </td>
                              <td id="windCell" > </td>
                              <td id="feelsLikeCell" > </td>
                              <td id="pressureCell" > </td>
                              <td id="visibilityCell" > </td>
                           </tr>
                           <tr>
                              <td id="currentForecast" colSpan="6" > </td>
                           </tr>
                        </thead>
                     </table>
                  </div>
              </form>
          </div>
      )
  }
}

// Function for fetching weather information for given city from API
function getWeatherForCity( city, state ) {
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
              console.log( json );

              // Get the cells in the table and populate them with data from the API response
              document.getElementById( "cityCell" ).innerHTML = city + ", " + state;
              document.getElementById( "tempCell" ).innerHTML = json.main.temp + "°F";
              document.getElementById( "humidityCell" ).innerHTML = json.main.humidity + "%";
              document.getElementById( "windCell" ).innerHTML = json.wind.speed + " mph";
              document.getElementById( "feelsLikeCell" ).innerHTML = json.main.feels_like + "°F";
              document.getElementById( "pressureCell" ).innerHTML = pressureConverter( json.main.pressure );
              document.getElementById( "visibilityCell" ).innerHTML = visibilityConverter( json.visibility );
              document.getElementById( "imageId" ).innerHTML = '<img src="http://openweathermap.org/img/wn/' + json.weather[0].icon + '@2x.png" />';
              document.getElementById( "currentForecast" ).innerHTML = json.weather[0].description.charAt(0).toUpperCase() + json.weather[0].description.slice( 1 ) + " currently.";
          }
      }

      // Send out XMLHttpRequest to openweather API
      xhr.send();
   }
   catch( error ) {
      console.log( "An error has occurred!" );
   }
}

// Helper function for converting atmospheric pressure from hpa to inHg
function pressureConverter( pressure ) {
   // Actual conversion for hpa to inHg
   var pressureInHg = pressure * 0.02953;
   // Taking that conversion and rounding it to two places after the decimal
   pressureInHg = ( Math.round( pressureInHg * 100 ) ) / 100.0;
   // Returing that value for display purposes
   return pressureInHg + " inHg";
}

// Helper function for converting meters to miles for visibility field
function visibilityConverter( value ) {
   // Actual conversion for meters to miles
   var visibility = value * 0.00062137119223733;
   // Taking that conversion and rounding it to two decimal places
   visibility = ( Math.round( visibility * 100 ) ) / 100.0;
   // Returning that value for display purposes
   return visibility + " mi";
}


