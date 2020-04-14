import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryInfo = (props) => {
	const {name, capital, population, languages, flag, region, subregion} = props;
	const [currWeather, setWeather] = useState([])

	let altText = `country flag of ${name}`

	console.log('reading api key from countryinfo level:', process.env.REACT_APP_API_KEY,
				'country is ', name)

	const weather_url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}
				  &query=${name}`

	const hook = () => {
		axios
			.get(weather_url)
			.then((res)=>{
				const weather = res.data.current
				const localtime = res.data.location.localtime

				const time = `Time now: ${localtime}`
				const temp = `Temperature: ${weather.temperature} degrees Celcius`
				const wind = `Wind: ${weather.wind_speed} mph ${weather.wind_dir}`

				updateWeather(time,temp,wind)

			})
	}

	useEffect(hook, [])

	const updateWeather = (time,temp,wind) => {
		setWeather([time, temp, wind])
	}

	return(
		<div>
			<span> Capital: {capital} </span> <br/>
			<span> Population: {population} </span>

			<p> Located in {subregion}, {region} </p>
		<h3> Languages spoken: </h3>
			<ul>
			{languages.map((lang, id) => 
				<li key={id}> {lang.name} </li>
			)}
			</ul>
		<h3> Flag </h3>
			<img src={flag} width='400px' height='300px' alt={altText}/>
		<h3> Weather in {capital} </h3>
			<ul>
			{currWeather.map((weather, id) =>
				<li key={id}> {weather} </li>
			)}
			</ul>
		</div>
	)
}

export default CountryInfo