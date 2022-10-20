import React from 'react';
import { NavLink } from 'react-router-dom';
import { links } from '../assets/constants';

const NavLinks = ({ handleClick }) => (
  <ul className="mt-10">
    {links.map((item) => (
      <li className="mt-8" key={item.name}>
        <NavLink
          to={item.to}
          className="flex flex-row justify-start items-center text-sm font-medium text-gray-400 hover:text-cyan-400"
          onClick={() => handleClick && handleClick()}
        >
          <item.icon className="w-6 h-6 mr-2" />
          {item.name}
        </NavLink>
      </li>
    ))}
  </ul>
);

export default NavLinks;
