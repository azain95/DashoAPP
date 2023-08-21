// App.js
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';




function Home() {
    // Retrieve user data from the cookie
    const userCookie = Cookies.get('user');
    const user = userCookie ? JSON.parse(userCookie) : null;
  
    // Fetch the daily quote
    const [quote, setQuote] = useState('');
    useEffect(() => {
      fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => setQuote(data.content));
    }, []);
  
      // State to hold weather data
      const [weather, setWeather] = useState(null);
  
      // Fetch weather data on component mount
      useEffect(() => {
        const city = 'Kuwait'; // You can change this to your desired city
        const apiKey = '241391722acb2320b0a15bb143ab7d90'; // Replace with your actual API key
    
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
          .then(response => response.json())
          .then(data => {
            const weatherInfo = {
              temperature: Math.round(data.main.temp),
              description: data.weather[0].description,
            };
            setWeather(weatherInfo);
          })
          .catch(error => console.error('Error fetching weather:', error));
      }, []);
  
    return (
      <div className="content home-content welcome-container">
        <h2>Welcome, {user ? user.name : 'Guest'} !</h2>
        <h3 className="welcome-message">We're glad to have you here. Feel free to explore and manage your requests.</h3>
        <div className="user-profile-card">
          {user && (
            <>
              <img src="profile-image-placeholder.png" alt="Profile " />
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Mobile: {user.mobile}</p>
            </>
          )}
        </div>
        <div className="daily-quote">
          <blockquote>{quote}</blockquote>
        </div>
        {/* <div className="weather-widget">
          {weather ? (
            <p>Your local weather: {weather.temperature}°C, {weather.description}</p>
          ) : (
            <p>Loading weather...</p>
          )}
        </div> */}
        <div id="openweathermap-widget-24"></div>
      </div>
    );
  }

  export default Home