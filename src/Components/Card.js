import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ image, title, text, url }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <img src={image} alt={title} className="mx-auto mb-4 h-48 w-full object-cover rounded-md" />
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <div className="flex flex-col justify-center items-center">
        <p className="text-gray-600 mb-4 line-clamp-2">
          {text}
        </p>
        
          <a href={url} className="text-blue-500">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Read More
            </button>
          </a>
        
      </div>
    </div>
  );
};

Card.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Card;