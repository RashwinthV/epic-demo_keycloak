import React from 'react';
import '../styles/Body.css';

function Body() {
    return (
        <div className="body-container">
            <section className="section" id="home">
                <h2>Welcome to our Website</h2>
                <p>This is the homepage. Explore our site to know more about us!</p>
            </section>

            <section className="section" id="about">
                <h2>About Us</h2>
                <p>We are a team of passionate developers building innovative solutions.</p>
            </section>

            <section className="section" id="contact">
                <h2>Contact Us</h2>
                <p>Have questions? Reach out to us at contact@ourwebsite.com.</p>
            </section>

            <section className="section" id="services">
                <h2>Our Services</h2>
                <p>We offer a variety of services including web development, mobile apps, and more.</p>
            </section>
        </div>
    );
}

export default Body;
