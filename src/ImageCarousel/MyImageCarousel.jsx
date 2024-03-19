import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import image1 from "../asset/carousel_images/MDH (5).JPG"
import image2 from "../asset/carousel_images/arora.jpeg"
import image3 from "../asset/carousel_images/tushar.jpeg"
import image4 from "../asset/carousel_images/all.jpeg"
import image5 from "../asset/carousel_images/smadhi.jpeg"
import image6 from "../asset/carousel_images/all.jpeg"

import "./ImageCarousel.css"
import { ChevronLeftRounded, ChevronRightRounded } from '@mui/icons-material'

export default function MyImageCarousel() {
    const imageList= [ image1, image2, image3, image4, image5, image6 ]
    const [currentImage, setCurrentImage]= useState(1);
    function prevImage(){
        setCurrentImage( currentImage > 1 ? currentImage-1 : currentImage)
    }
    function nextImage(){
        setCurrentImage( currentImage < imageList.length-2 ? currentImage+1 : currentImage)   
    }
    
    useEffect(() => {
        const interval = setInterval(() => {
          // Update the image index every 5 seconds
          setCurrentImage(prevIndex => (prevIndex + 1) % imageList.length);
        }, 5000); // 5000 milliseconds = 5 seconds
    
        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, [imageList.length]);

    return (
        <Box className="carousel-Container">
            {/* <h1>image ni {currentImage}</h1> */}
            <Box className="carousel-buttons">
                <Box className={`${currentImage === 1 ? "invisible" : "icons"}`}>
                    <ChevronLeftRounded fontSize='large' onClick={prevImage} />
                </Box>
                
                <Box className={`${currentImage === imageList.length-2 ? "invisible" : "icons"}`} onClick={nextImage}>
                    <ChevronRightRounded fontSize='large' />
                </Box>
            </Box>
            {
                imageList.map((data, index) => (
                    <Box 
                        className={`carousel-image 
                            ${
                                index === currentImage-1 ? "leftImg" : 
                                index === currentImage ? "centerImg" :
                                index === currentImage+1 ? "rightImg" : "hideImg"
                            }
                        `}
                        key={index}
                    >
                        <img
                            src={data} 
                            alt={`carousel item#${index}`}
                        />
                    </Box>
                ))
            }
        </Box>
    )
}
