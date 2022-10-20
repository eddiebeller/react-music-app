import React from 'react';

function Heading({ title }) {
  return (
    <h2 className="font-bold text-3xl text-white text-left mb-10 mt-4">
      {title}
    </h2>
  );
}

export default Heading;
