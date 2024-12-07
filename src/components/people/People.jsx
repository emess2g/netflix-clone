import React, { useEffect, useRef, useState } from 'react'
import './people.css'
const People = () => {
    const [cast,setCast] = useState([]);
    const [notFoundImg,setNotFoundImg] = useState()
    const cardsRef = useRef();


    const handleWheel = (event) => {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
    }

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWU1ZjFmYjFiNTgzNDQxMDk0MjQ0OTA3NThlZTZmNSIsIm5iZiI6MTcxMTQ1NzM4OC4xOTUwMDAyLCJzdWIiOiI2NjAyYzQ2Yzc3MDcwMDAxNjMwYmE2ZGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hai4QUM5y8-IatnwjAsC7fFrB9LypPAmlZ8wN67wY_g'
        }
      };
      
    
    useEffect(()=>{
        fetch('https://api.themoviedb.org/3/trending/person/day?language=en-US', options)
        .then(res => res.json())
        .then(res =>setCast(res.results))
        .catch(err => console.error(err));

        cardsRef.current.addEventListener('wheel', handleWheel);
    },[])

  return (
    <div ref={cardsRef} className='people'>
        <h2>Most Popular Celebrities</h2>
        <div className="people-list">
        {cast.map((c,index)=>(  
        <div className="" id={c.id} key={index}>
            {c.profile_path ? <img src={`https://image.tmdb.org/t/p/w500${c.profile_path}`}  alt="" /> : <img src="https://www.movienewz.com/img/films/poster-holder.jpg" alt="" /> }
           
           
             <p>{c.name}</p>
        </div>
      ))}
        </div>
      
    </div>
  )
}

export default People
