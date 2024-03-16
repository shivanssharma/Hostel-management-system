
import React from 'react';
import ImageCarousel from '../ImageCarousel/imagecarousel';
import './homepage.css';

// Home component
const Layout = () => {
  return (
    <div className='Title'>
      {/* Home component content */}
      <p>SRI SATHYA SAI INSTITUTE OF HIGHER LEARNING</p>
      <hr />
      <div className="content-container">
        <ImageCarousel />
        <br />
        <br />
        <br />
        <div id="text">
          <p>A college that does not confer the knowledge of the Spiritual Reality to the students who are engaged in the pursuit</p>
          <p>of various material studies is as barren as the sky without the moon, or a heart without peace, or a nation without</p>
          <p>reference to law.</p>
          <strong>- Shri Satya Sai Baba</strong>
        </div>
        <br/>
        {/* Cards */}
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', marginBottom: '20px' }}>
          <h3>Enrollment!!</h3>
          <p>Enrol yourself to use the services</p>
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', marginBottom: '20px' }}>
          <h3>Room!!</h3>
          <p>Want to see which room You are in...</p>
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', marginBottom: '20px' }}>
          <h3>Holistic Health</h3>
          <p>Get The service of Hospital In Our Hostel</p>
        </div>

        {/* Figures/Images */}
        <div className='figure'>
        <figure style={{ marginBottom: '20px'}}>
          <img src="images\swami with kids.jpeg" alt="swami with kids" style={{ maxWidth: '70%', borderRadius: '8px' }} />
          <figcaption>Figure 1: Swami With Kids</figcaption>
        </figure>

        <figure style={{ marginBottom: '20px' }}>
          <img src="images\swami with kids.jpeg" alt="swami with students" style={{ maxWidth: '70%', borderRadius: '8px' }} />
          <figcaption>Figure 2: Swami with Students</figcaption>
        </figure>
        </div>
        {/* Add more cards, figures, and images as needed */}
      </div>
    </div>
  );
};

export default Layout;
