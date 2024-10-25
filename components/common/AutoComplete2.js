import React, { useState, useEffect } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import airportsData from '../../src/util/AirportNames.json';

const AirportSearch = ({ placeholder, className, icon }) => {
    const [items, setItems] = useState([])
    const [selectedAirport, setSelectedAirport] = useState('')
    useEffect(() => {
       
        const processedData = airportsData.map((airport, index) => ({
        
          id: index,
          name: airport.AirportName.split(',')[0] + '-' + airport.AirportName.split(',')[2] + ','+ airport.AirportName.split(',')[1]+','+airport.AirportName.split(',')[3]
        }))
        setItems(processedData)
      }, [])
      const handleOnFocus = () => {
        console.log("Focused");
      };
      const handleOnHover = (result) => {
        // the item hovered
        console.log(result);
      };
      const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results);
      };
      const handleOnSelect = (item) => {
        // the item selected
        
        const [city, code,airport,country, ] = item.name.split(',')
        const formattedName = (
            <>
                <span>
        {`${city} - (${code}), ${country}, `}<b>{airport}</b>
            </span>
            </>
          )
          
          // Set the formatted selected airport for display
          setSelectedAirport(formattedName)
      }
    
      const formatResult = (item) => {
       
        const [city, country, code, airport] = item.name.split(',')
        const formattedName = `${city} (${code}), ${country}, ${airport}`
        return (
          <span>
        {`${city} - (${country}), ${code}, `}<b>{airport}</b>
            </span> 
        )
      }

  return (
    <>
      <div className={`autoComplete inputGroup ${className}`}>
        <ReactSearchAutocomplete
          items={items}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          autoFocus
          formatResult={formatResult}
          placeholder={placeholder}
          showIcon={false}
        />

        <div className="icon">
          <FontAwesomeIcon icon={icon} />
        </div>
      </div>
    </>
  )
};
export default AirportSearch