import './App.css';

const WeatherWidget = (props) => {
    return(
        <div>
        {props.loading === "failed" && <div> failed to connect to {props.url} </div>}
        {props.loading === "loading" && <div>Weather is Loading...setTimeOut to replicate</div>}
        {props.loading === "loaded" && <div className='weather-row'>Temperature: {props.weather.condition.temp_F}F   Condition: {props.weather.condition.weatherDesc[0].value}</div>}
        </div> 
    )
}

export default WeatherWidget
