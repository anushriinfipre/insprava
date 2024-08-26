import React from 'react'

const Carousel = ({dogs,handlePreviousPage,handleNextPage}) => {
  return (
    <>
    <div className='courosel'>
    <hr></hr>
    <p><strong>Dog breeds</strong><br></br>
    <span>Everyday is a Dog Day</span></p>
    <div className="carousel-container">
               
                

                    <div className="carousel">
                         <button className="carousel-control prev" onClick={handlePreviousPage}>
                            &lt;
                        </button> 
                         <div className="carousel-track" > 
                            {dogs.map((dog, index) => (
                                <div className="carousel-item" key={index}>
                                    <img src={dog.url} alt={dog.breeds[0]?.name || 'Dog'} />
                                    <div className="card-content">
                                        <h2>{dog.breeds[0]?.name || 'N/A'}</h2>
                                        <p> {dog.breeds[0]?.location || 'N/A'}</p>
                                        <br></br>
                                        <p> {dog.breeds[0]?.life_span || 'N/A'}</p>
                                        <p> {dog.breeds[0]?.temperament || 'N/A'}</p>
                                        <p>{dog.breeds[0]?.bred_for || 'N/A'}</p>
                                    </div>
                                </div>
                            ))}
                        </div> 
                         <button className="carousel-control next" onClick={handleNextPage}>
                            &gt;
                        </button> 
                     </div>
                    
               
                </div>
                </div>
    </>
  )
}

export default Carousel