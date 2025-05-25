"use client"

import { useEffect } from 'react';

function BootstrapClientCDN() {
  useEffect(() => {
    //require('bootstrap/dist/js/bootstrap.bundle.js');
  }, []);

  return (
    <><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script></>
  );
}

export default BootstrapClientCDN;