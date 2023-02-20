import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';


function Header() {
  return (
    <header className="flex justify-between p-5 max-w-7xl mx-auto">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            className="w-44 object-contain cursor-pointer"
            src="/pandalogoOG_WebLogo.png"
            alt=""
          />
        </Link>
        <div className="hidden md:inline-flex items-center space-x-5">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3>
            <Button className="px-4" variant="default">
              Follow
            </Button>
          </h3>
        </div>
      </div>
      <div className="flex items-center space-x-5 text-green-600">
        <h3>Sign In</h3>
        <h3>
          <Button className="px-4" variant="outline">
            Get Started
          </Button>
        </h3>
      </div>
    </header>
  );
}

export default Header;