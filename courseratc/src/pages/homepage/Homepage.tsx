import React from 'react';
import Hero from "../../sections/hero/Hero";
import Specials from "../../sections/specials/Specials";
import Testimonials from "../../sections/testimonials/Testimonials";
import About from "../../sections/about/About";

const Homepage: React.FC = () => {
    return (
        <main>
            <Hero />
            <Specials />
            <Testimonials />
            <About />
        </main>
    );
};

export default Homepage;
