import React, { useState, useEffect } from 'react';
import 'pages/NotFound/notFound.css';

const NotFound = () => {
  const [opacity, setOpacity] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setOpacity(true);
    }, 150);
  }, []);
  return <div className="not-found" style={{ opacity: opacity ? 1 : 0 }}></div>;
};

export default NotFound;
