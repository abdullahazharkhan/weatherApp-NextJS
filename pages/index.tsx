import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Paper, TextInput, Button, Text, Group } from "@mantine/core";
import { useState } from 'react';

const API_KEY = "c63d63d1d3c0321d8c20e1f1a211dad5";

export default function Home() {

  const [cityInput, setCityInput] = useState(""); //Karachi
  
  const [weatherData, setWeatherData] = useState<any>({});  {city: "karachi"}

  async function getWeatherData(){
    console.log("Button pressed");
    //  https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    try {
      const serverResponse = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?" +
        "q="+
        cityInput +
        "&appid="+
        API_KEY +
        "&units=metric"
      );
      const data = await serverResponse.json();
      console.log(data);
      if(data?.cod === "400") throw data;
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  }
  
  console.log(cityInput);

  return (
    <div
      style={{
        position: "static",
        height: "100vh",
        backgroundImage: "url('https://littlevisuals.co/images/downtown.jpg')",
        backgroundSize: "cover"
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        }}
      >
      <Paper withBorder p="lg" style={{maxWidth: "500px"}}>
        <Group position='apart'>
          <Text size="xl" weight="500">
            Get The Weather!
          </Text>
        </Group>
        <Group position='apart'>
          <Text size="lg">
            Enter a City, and get the weather below
          </Text>
        </Group>
        <Group position='apart' mb="xs">
          <TextInput
            label="City Name"
            placeholder='ex: Karachi'
            onChange={(e) => setCityInput(e.target.value)} // C -> setCityInput("C")
          />
        </Group>
        <Group position='apart'>
          <Button variant="gradient" size='md' onClick={()=> getWeatherData()}>
            Get Weather
          </Button>
        </Group>
        {Object.keys(weatherData).length !== 0 ? 
          <>
        <Group position='left'>
           <Text>
            {weatherData.name} Weather 
           </Text>
        </Group>
        <Group position='left'>
          <img
            src={'http://openweathermap.org/img/wn/' + weatherData.weather[0].icon + "@4x.png"}
            width="100px"
            height="100px"
          />

           <Text size="lg" weight={500}>
            Currentl {weatherData.main.temp}&deg;C
           </Text>
        </Group>
          </>
          : null
        }
      </Paper>
      </div>
    </div>
  )
}
