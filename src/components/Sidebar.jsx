import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineMenu } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';

import { logo } from '../assets';
import { links } from '../assets/constants';

// TODO: Refactor NavLinks component and move it from Sidebar component.
// Move Navigation/Mobile navigation to two separated componets from Sidebar component.
// Move burger component from Sidebar component
// Create a handleClick function

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

const Sidebar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <>
      <aside className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
        <img src={logo} alt="Logo" className="w-full h-14 object-contain" />
        <NavLinks />
      </aside>

      <div className="absolute md:hidden block top-6 right-3 cursor-pointer z-10">
        {mobileMenu ? (
          <RiCloseLine
            onClick={() => setMobileMenu(false)}
            className="w-6 h-6 text-white mr-2"
          />
        ) : (
          <HiOutlineMenu
            onClick={() => setMobileMenu(true)}
            className="w-6 h-6 text-white mr-2 cursor-pointer"
          />
        )}
      </div>

      <aside
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenu ? 'left-0' : '-left-full'
        }`}
      >
        <img src={logo} alt="Logo" className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setMobileMenu(false)} />
      </aside>
    </>
  );
};

export default Sidebar;
