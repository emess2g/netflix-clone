import React, { useEffect, useRef, useState,  } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'

const TitleCards = ({title, category}) => {

const [apiData, setApiData] = useState([]);
const cardsRef = useRef();

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWU1ZjFmYjFiNTgzNDQxMDk0MjQ0OTA3NThlZTZmNSIsIm5iZiI6MTcxMTQ1NzM4OC4xOTUwMDAyLCJzdWIiOiI2NjAyYzQ2Yzc3MDcwMDAxNjMwYmE2ZGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hai4QUM5y8-IatnwjAsC7fFrB9LypPAmlZ8wN67wY_g'
  }
};


const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=>{
  cardsRef.current.addEventListener('wheel', handleWheel);

  fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));
},[])

  return (
    <div className='title-cards' >
      <h2>{title? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <div className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </div>
        })}
      </div>
    </div>
  )
}

export default TitleCards
