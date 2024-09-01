import React from 'react';
import logo from "../assets/lp1.jpg"
import logo1 from "../assets/lp2.jpg"
import logo2 from "../assets/lp3.jpg"
import logo3 from "../assets/retention.jpeg"
import logo4 from "../assets/revenue2.jpg"
import Card from "../Components/Card"
// import {Link} from "react-router-dom"
// import {toast} from "react-hot-toast"

const Home = () => {
  const cardData = [
    {
      image: logo,
      title: 'Customer Retention',
      text: 'Send personalized emails to your customers automatically. This helps in maintaining customer engagement and loyalty.',
      url: 'https://userpilot.com/blog/customer-retention-analytics-ultimate-guide/'
    },
    {
      image: logo1,
      title: 'Customer Analytics',
      text: 'Get insights into your customers’ behavior and preferences. Analyze customer data improve your services.',
      url: 'https://global.hitachi-solutions.com/blog/big-data-banking/'
    },
    {
      image: logo2,
      title: 'Loyalty Programs',
      text: 'Reward your loyal customers with exclusive offers and points. Encourage repeat purchases and customer loyalty.',
      url: 'https://www.mparticle.com/blog/customer-data-platform-banking-use-cases/'
    },
  ]
  return (
    <div className="bg-gray-100">


      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r bg-customBlue to-blue-700 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Boost Customer Loyalty</h1>
        <p className="text-lg md:text-2xl mb-8">The all-in-one solution to keep your customers coming back.</p>
        <button className="bg-white text-blue-700 px-6 py-3 rounded-md font-bold"
          onClick={() => window.location.href = '/login'}>Get Started
        </button>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="max-w-[1160px] mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cardData.map((card, index) => (
              <Card
                key={index}
                image={card.image}
                title={card.title}
                text={card.text}
                url={card.url}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 bg-customBlue">
          <div className="max-w-[1160px] mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-100 mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="flex items-center">
              <img src={logo3} alt="Benefit 1" className="h-48 w-full object-cover rounded-lg shadow-md mr-6" />
              <div>
                <h3 className="text-xl font-bold text-gray-100 mb-2">Increase Retention Rates</h3>
                <p className="text-gray-100">Our advanced tools are designed to enhance customer engagement, ensuring they remain loyal to our brand.</p>
              </div>
            </div>

            <div className="flex items-center">
              <img src={logo4} alt="Benefit 2" className="h-48 w-full object-cover rounded-lg shadow-md mr-6" />
              <div>
                <h3 className="text-xl font-bold text-gray-100 mb-2">Boost Revenue</h3>
                <p className="text-gray-100">Loyal customers are the backbone of sustained business growth. They are more likely to make repeat purchases, leading to a steady and predictable revenue stream.</p>
            </div>
            </div>
            </div>
            </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-16 bg-blue-900 text-white">
        <div className="max-w-[1160px] mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg mb-8">Have questions? We'd love to hear from you.</p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-md font-bold"
            onClick={() => window.location.href = '/Contact'}>
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
