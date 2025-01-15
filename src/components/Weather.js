import React, { useState } from 'react';

const Weather = () => {
    const [city, setCity] = useState(''); // State to store the city input by the user
    const [weatherData, setWeatherData] = useState(null); // State to store the fetched weather data
    const [error, setError] = useState(''); // State to store error messages

    const getWeather = async () => {
        if (!city) { // Check if the city is not provided
            setError('Please enter a city name.'); // Set error message if city is missing
            return;
        }

        const apiKey = 'cb1e6b284aca4eef2a5be11bfb9a7ed7'; // API key for OpenWeatherMap
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Construct API URL with city and API key

        try {
            const response = await fetch(url); // Make an API request
            if (!response.ok) { // Check if the response is not okay
                throw new Error('City not found'); // Throw an error if city is not found
            }
            const data = await response.json(); // Parse the response JSON
            setWeatherData(data); // Update weather data state with the fetched data
            setError(''); // Clear any previous errors
        } catch (err) { // Handle errors during API call
            setError(err.message); // Set error message
            setWeatherData(null); // Clear weather data if there's an error
        }
    };

    return (
        <div
            className='w-full h-screen gap-10 bg-gradient-to-r from-gray-300 to-blue-600 p-0 m-0 
        flex flex-col items-center justify-center'>
            <div className='max-w-[1260px] mx-auto flex flex-col shadow-2xl shadow-white rounded p-9'>
                <div className='text-center h-[200px]'>
                    <h1 className='font-bold text-2xl mb-[20px] text-white'> Weather App </h1> {/* App title */}
                    <div className='flex flex-col gap-8 mb-[20px]'>
                        <input
                            type="text" // Input type for city name
                            placeholder='Enter city name' // Placeholder text for input
                            className='outline-none rounded border-black p-2 w-[320px] shadow-2xl' // Input styling
                            value={city} // Bind input value to city state
                            onChange={(e) => setCity(e.target.value)} // Update city state on input change
                        />
                        <button
                            onClick={getWeather} // Trigger getWeather function on click
                            className='bg-gradient-to-r from-gray-300 to-blue-800 w-[200px] p-1 mx-auto
                                   rounded shadow-2xl font-bold text-white hover:bg-gradient-to-r hover:from-yellow-500 hover:to-red-800'>
                            Get Weather {/* Button label */}
                        </button>
                    </div>
                </div>

                {error && <div className='text-red-500 font-bold text-center'>{error}</div>} {/* Display error message if any */}

                {weatherData && (
                    <div
                        className='flex flex-col text-[16px] text-white bg-gradient-to-r from-orange-500 to-white-500
                            font-bold p-5 rounded shadow-2xl'>
                        <p>City: {weatherData.name}</p> {/* Display city name */}
                        <p>Temperature: {weatherData.main.temp} &#8451;</p> {/* Display temperature in Celsius */}
                        <p>Weather: {weatherData.weather[0].description}</p> {/* Display weather description */}
                        <p>Humidity: {weatherData.main.humidity}%</p> {/* Display humidity percentage */}
                    </div>
                )}

                {!weatherData && !error && <div className='text-white'>No Data</div>} {/* Display "No Data" if no weather data or error */}
            </div>

            <footer className='mt-[40px]'>
                <p className='text-white text-[14px]'>Copyright Weather App 2025</p> {/* Footer copyright text */}
            </footer>
        </div>
    );
};

export default Weather;
