import React, { useState } from 'react';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const getWeather = async () => {
        if (!city) {
            setError('Please enter a city name.');
            return;
        }

        const apiKey = 'cb1e6b284aca4eef2a5be11bfb9a7ed7';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            setWeatherData(data);
            setError('');
        } catch (err) {
            setError(err.message);
            setWeatherData(null);
        }
    };

    return (
        <div className="w-full min-h-screen gap-10 bg-gradient-to-r from-gray-300 to-blue-600 p-4 flex flex-col items-center justify-center">
            <div className="sm:max-w-[600px] w-full flex flex-col shadow-2xl shadow-white rounded p-9">
                <div className="text-center">
                    <h1 className="font-bold text-2xl sm:text-3xl mb-5 text-white">Weather App</h1>
                    <div className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Enter city name"
                            className="outline-none rounded border-black p-2 w-full max-w-[320px] shadow-2xl mx-auto"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <button
                            onClick={getWeather}
                            className="bg-gradient-to-r from-gray-300 to-blue-800 w-full max-w-[200px] p-2 rounded shadow-2xl font-bold text-white hover:bg-gradient-to-r hover:from-yellow-500 hover:to-red-800 mx-auto"
                        >
                            Get Weather
                        </button>
                    </div>
                </div>

                {error && <div className="text-red-500 font-bold text-center mt-4">{error}</div>}

                {weatherData && (
                    <div className="mt-5 flex flex-col text-sm sm:text-base text-white bg-gradient-to-r from-orange-500 to-white-500 font-bold p-5 rounded shadow-2xl w-full max-w-[400px] mx-auto">
                        <p>City: {weatherData.name}</p>
                        <p>Temperature: {weatherData.main.temp} &#8451;</p>
                        <p>Weather: {weatherData.weather[0].description}</p>
                        <p>Humidity: {weatherData.main.humidity}%</p>
                    </div>
                )}

                {!weatherData && !error && <div className="text-white text-center mt-4">No Data</div>}
            </div>

            <footer className="mt-10">
                <p className="text-white text-sm sm:text-base">Copyright Weather App 2025</p>
            </footer>
        </div>
    );
};

export default Weather;
