// Logo.jsx - Clean Text Logo
import React from 'react';

const Logo = ({ width = '120px', height = 'auto', color = '#3B82F6' }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 150 50" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
    >
      <text 
        x="0" 
        y="35" 
        fill={color} 
        fontSize="32" 
        fontFamily="'Segoe UI', 'Arial', sans-serif" 
        fontWeight="800"
      >
        BLOG
      </text>
      <text 
        x="88" 
        y="35" 
        fill="#6B7280" 
        fontSize="24" 
        fontFamily="'Segoe UI', 'Arial', sans-serif" 
        fontWeight="300"
      >
        app
      </text>
    </svg>
  );
};

export default Logo;