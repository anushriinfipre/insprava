import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import "../styles/table.css"
//import { Carousel } from 'react-responsive-carousel';
import Carousel from './Carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Table = () => {
    const [dogs,setDogs] = useState([]);
    const [loading,setloading] = useState(false);
    const [currentPage,setCurrentpage] = useState(0);
    const [error,setError] = useState(null);
    const carouselRef = useRef(null);


    const preloadImages = (dogData) => {
      return Promise.all(
          dogData.map(dog => {
              return new Promise((resolve, reject) => {
                  const img = new Image();
                  img.src = dog.url;
                  img.onload = resolve;
                  img.onerror = reject;
              });
          })
      );
  };

    const fetchDogs = async(page)=>{
        setloading(true);
        setError(null);
        try{
            const response = await axios.get(`https://api.thedogapi.com/v1/images/search`,
                {
                    params: {
                        size: 'med',
                        mime_types: 'jpg',
                        format: 'json',
                        has_breeds: true,
                        order: 'RANDOM',
                        page: page,
                        limit: 10
                      },
                    headers:{
                        'x-api-key': 'live_GhXL2pki6pFpAKEfE69Ddrr8AJBlF6kog2F0BNYBbYSloX9FXmcolr1mXK5Ni8QN',
                    },
                }
            );
            console.log('Full response',response.data);
            console.log("dog state");
            if(response.status == 200)
            {
                console.log('Setting dog state',response);
                await preloadImages(response.data);

                setDogs(response.data);
                console.log(dogs)
                console.log((response.data));
            }
            else{
                setError('Unexpected response format');
                console.log('Dog data not set');
            }

        }catch(error){
            console.error('Error fetching dog data',error); 
            setError(`Failed to fetch dog data ${error.message}`); 
            console.log(dogs);
        }finally{
            setloading(false);
        }
    };

    useEffect(()=>{
        fetchDogs(currentPage);
    },[currentPage])

    useEffect(()=>{
      fetchDogs()
    },[])

    const handlePreviousPage = () => {
      if (currentPage > 0) {
          setCurrentpage(prevPage => prevPage - 1);
      }
  };

   const handleNextPage = () => {
         setCurrentpage(prevPage => prevPage + 1);
   }

  
    
  return (
    <>
     <div>
      <h1 className='main-heading'>Dog's Information</h1>
      {loading ? (
        <p style={{display:'flex',alignItems:'center',justifyContent:'center'}}>Loading...</p>
      ) : error ? (<p>Error</p>):(
        <table>
          <thead>
            <tr>
              <th>Breed Name</th>
              <th>Bred For</th>
              <th>Breed Group</th>
              <th>Life Span</th>
              <th>Temperement</th>
            </tr>
          </thead>
          <tbody>
            {dogs.map((dog, index) => (
              <tr key={index}>
                <td>{dog.breeds[0]?.name || 'N/A'}</td>
                <td>{dog.breeds[0]?.bred_for || 'N/A'}</td>
                <td>{dog.breeds[0]?.breed_group || 'N/A'}</td>
                <td>{dog.breeds[0]?.life_span || 'N/A'}</td>
                <td>{dog.breeds[0]?.temperament || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
                <div className="pagination">
                    <button onClick={handlePreviousPage} disabled={currentPage === 0}>
                        Previous
                    </button>
                    <span>Page {currentPage + 1}</span>
                    <button onClick={handleNextPage}>
                        Next
                    </button>
                </div>
    </div>
  
 
  <Carousel dogs={dogs} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage}/>
            
    </>
    
  );
}

export default Table