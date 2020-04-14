import React, { useState } from 'react';
import CountryInfo from './CountryInfo.js'

const Country = (props) => {
	const {name, capital, languages, population, flag, region, subregion} = props;

	const [ show, setShow ] = useState(1)

	const handleShow = (e) => {
		e.preventDefault();
		setShow(!show)
	}

	return(
		<div>
		<a onClick={handleShow} style={{background: 'lime', color: 'black'}} href="#"> {name} </a>
		{!show && 
		<div>
		<CountryInfo name={name} capital={capital} population={population}
					 languages={languages} flag={flag}
					 region={region} subregion={subregion} />
		</div>
		}
		</div>
	)
}

export default Country