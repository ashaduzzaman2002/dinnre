import React, { useEffect, useState } from 'react'

const ScrollTop = () => {
    const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentHeight = window.scrollY || window.pageYOffset;

      if (currentHeight > window.innerHeight) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
    {showButton && (
        <button
          onClick={() => window.scrollTo(0, 0)}
          className="btn btn-lg btn-primary btn-lg-square back-to-top"
          style={{ backgroundColor: '#feb445', borderColor: '#feaa2d' }}
        >
          <i className="bi bi-arrow-up"></i>
        </button>
      )}
      </>
  )
}

export default ScrollTop