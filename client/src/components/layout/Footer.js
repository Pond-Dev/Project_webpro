import React from 'react';

export default () => {
  return (
    <footer id="footer" className="bg-dark text-white mt-5 p-2 text-center">
      Travarel <i class="fas fa-globe-asia"></i> {new Date().getFullYear()}
    </footer>
  );
};
