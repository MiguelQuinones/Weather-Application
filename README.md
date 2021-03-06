# Overview

This application displays the weather for a given city as entered by the user. Users can choose to see specific information for the day, or a more general forecast for the week.

# Link to Active Site

The site it currently being hosted via GitHub Pages: https://miguelquinones.github.io/Weather-Application/

# Using the Application

When a user clicks on the link above, they need to choose to view either the daily forecast or weekly forecast first. Afterwards, they are free to switch between either forecast

# Other Information

This application was created using Node.js, React.js, and the public Openweather API. When a user enters a city and state into the application, it fetches the correct information
from the Openweather API and then displays it back to the user. Because the Openweather API displays all their information in Kelvin by default, I created additional helper functions that perform conversions to make the info displayed to users appear in imperial. This application was done as a way to learn some of the basics of working with Node.js, a front-end framework like React.js, and a public API.
