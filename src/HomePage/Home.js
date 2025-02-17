
import React from 'react';
import './homepage.css';
import "../asset/sharedAnimation.css"
import MyImageCarousel from '../ImageCarousel/MyImageCarousel';
import { Box } from '@mui/material';

// Home component
const Layout = () => {
  return (
    <Box className='Title'>
      {/* Home component content */}
      <p class="title BrasikaFont floatUpIn grayFont">SRI SATHYA SAI INSTITUTE OF HIGHER LEARNING</p>
      {/* <hr /> */}
      <Box className="content-container" >
        <Box 
          sx={{overflow: 'hidden', p: 2, height: {xs:'200px',md:'600px'}, backgroundColor: '#d9c6ba'}}
          className="fadeIn"
        >
          <MyImageCarousel />
        </Box>
        <Box className="text BrasikaFont">
          <p className="floatUpIn">
            A college that does not confer the knowledge of the Spiritual Reality to the students who are engaged in the pursuit
            of various material studies is as barren as the sky without the moon, or a heart without peace, or a nation without
            reference to law.
          </p>
          <strong className="floatUpIn" style={{fontSize: '150%'}}>- Sri Sathya Sai Baba</strong>
        </Box>
        <br/>
        {/* Cards */}
        <Box className="flexRow" sx={{justifyContent: 'space-between'}}>
          <Box className="text1 BrasikaFont">
            <h3 className="floatUpIn">Enrollment!!</h3>
            <p className="floatUpIn">Enroll yourself and be part of our hostel</p>
          </Box>

          <br/>
          <Box className="text1 BrasikaFont">
            <h3 className="floatUpIn">Room!!</h3>
            <p className="floatUpIn">Want to see which room You are in...</p>
          </Box>

          <br/>
          <Box className="text1 BrasikaFont">
            <h3 className="floatUpIn">Holistic Health!!</h3>
            <p className="floatUpIn">Get The service of Hospital In Our Hostel</p>
          </Box>
        </Box>

        
        <div className='figure'>
        <figure style={{ marginBottom: '20px'}}>
          <img src="images\_MG_1893.JPG" alt="Eco Einstein: Plogging" style={{ maxWidth: '90%', borderRadius: '8px' }} />
          <figcaption>Eco Einsteins: Plogging</figcaption>
        </figure>

        <figure style={{ marginBottom: '20px' }}>
          <img src="images\_MG_1907.JPG" alt="Eco Einstein: Plogging" style={{ maxWidth: '90%', borderRadius: '8px' }} />
          <figcaption>Eco Einsteins: Plogging</figcaption>
        </figure>

        <figure style={{ marginBottom: '20px' }}>
          <img src="images\_MG_0450.JPG" alt="Eco Einstein: Plogging" style={{ maxWidth: '90%', borderRadius: '8px' }} />
          <figcaption>Eco Einsteins: Sending Waste for recycling</figcaption>
        </figure>


        <figure style={{ marginBottom: '20px' }}>
          <img src="images/_MG_0343.JPG" alt="Eco Einstein: Plogging" style={{ maxWidth: '90%', borderRadius: '8px' }} />
          <figcaption>Eco Einsteins: Waste seggregation</figcaption>
        </figure>
        </div>
        
      </Box>
    </Box>
  );
};

export default Layout;
