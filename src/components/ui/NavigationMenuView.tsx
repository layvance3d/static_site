import React from 'react';
import Link from 'next/link';
import './navigation-menu.scss';

interface NavigationMenuProps {
  // Add props type here
}

const NavigationMenu: React.FC<NavigationMenuProps> = () => {
  return (
    <nav className="navigation-menu">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;
