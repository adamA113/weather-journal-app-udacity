/* Global Variables */
const serverUrl = `http://localhost:3000`;
const apiKey = ``; // add your own key
const countryCode = 'us';
const generateBtn = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${(d.getMonth() + 1)}.${d.getDate()}.${d.getFullYear()}`;

const getWeatherData = async (zip = '') => {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather`;
    const params = new URLSearchParams({
        zip: `${zip},${countryCode}`,
        appid: apiKey,
        units: 'imperial'
    });

    const baseUrl = `${weatherURL}?${params.toString()}`;

    try {
        const response = await fetch(baseUrl);
        const data = await response.json();

        return data.main.temp;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

const postData = async (url = '', data = {}) => {
    const response = await fetch(`${serverUrl}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),     
    });

    try {
        const newData = await response.json();
    
        return newData;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const retrieveData = async (url) => {
    const request = await fetch(`${serverUrl}${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }   
    });

    try {
        const allData = await request.json();

        document.getElementById('temp').innerHTML = `${Math.round(allData.temp)} degrees Fahrenheit`;
        document.getElementById('content').innerHTML = allData.userResponse;
        document.getElementById('date').innerHTML = allData.date;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

const isNumber = value => {
    const parsedValue = parseInt(value);

    return typeof parsedValue === 'number' && !isNaN(parsedValue);
}

generateBtn.addEventListener('click', async () => {
    const zip = document.getElementById('zip').value.trim();
    const userResponse = document.getElementById('feelings').value.trim();

    if (isNumber(zip) && !!userResponse) {
        const temp = await getWeatherData(zip);

        await postData('/add', { temp, userResponse, date: newDate });
        await retrieveData('/all');
    } else {
        alert("Make sure zip is a number, and enter your feelings!");
    }   
});