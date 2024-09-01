import contactImage from '../assets/c.png'
import React, { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/contact", formData);
      setFormData({ name: "", email: "", message: "" });
      toast.success("Message sent successfully!");
    }
    catch (error) {
      toast.error("There was an error sending the message:");
      console.error("There was an error sending the message:", error);
    }
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-between py-16 bg-customBlue">
      <div className="md:w-1/2 px-8">
        <h2 className="text-3xl font-bold text-5 mb-6">Get in Touch</h2>
        <p className="text-lg text-5 mb-8">
          Have questions or need help? Feel free to reach out to us. We're here to assist you.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-5 font-medium mb-2" htmlFor="name">Your Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-5 bg-800 rounded-[0.5rem] text-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-5 font-medium mb-2" htmlFor="email">Your Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-5 bg-800 rounded-[0.5rem] text-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-5 font-medium mb-2" htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full p-3 border border-5 bg-800 rounded-[0.5rem] text-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-slate-700 text-900 py-3 rounded-md font-bold hover:bg-blue-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
      <div className="md:w-1/2 mt-10 md:mt-0 px-8">
        <img
          src={contactImage}
          alt="Contact Us"
          className="w-full h-80 object-cover rounded-md shadow-lg"
        />
        <div className="mt-8 text-5">
          <h3 className="text-xl font-bold mb-2">Contact Information</h3>
          <p className="mb-2"><strong>Email:</strong> avishkargutte3482@gmail.com</p>
          <p className="mb-2"><strong>Phone:</strong> 8483904210</p>
          <p className="mb-2"><strong>Address:</strong> Dr. D. Y. Patil institute of Technology, Pimpri</p>
        </div>
      </div>
    </section>
  );
};


export default Contact
