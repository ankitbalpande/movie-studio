import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { TbMenu2 } from 'react-icons/tb';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    console.log('Toggling menu, current state:', !menuOpen); // Log updated state
  };

  const navLinks = [
    {
      mainMenuName: 'Movie',
      dropdownLinkList: [
        { subName: 'Popular', subLink: '/popular' },
        { subName: 'Top Rated', subLink: '/top-rated' },
        { subName: 'Upcoming', subLink: '/upcoming' },
      ],
    },
    { 
      mainMenuName: 'TV Shows',
      dropdownLinkList: [
        { subName: 'Popular', subLink: '/tv-show-popular' },
        { subName: 'Top Rated', subLink: '/tv-show-top-rated' },
        { subName: 'Trending', subLink: '/trending' },

      ],
    },
    { mainMenuName: 'People' },
  ];

  return (
    <header className=" w-full fixed top-0 left-0 z-50">
      <div className="w-full bg-primary relative md:!z-50">
        <div className="w-full lg:px-24 md:px-16 md:py-1 py-2 px-2">
          <div className="w-full flex justify-between">
            <div className="flex items-center gap-4">
              <div className="flex justify-start items-center">
                <Link to="/">
                  <img
                    src="/movie-studio-dark.png"
                    alt="Movie Studio"
                    className="md:w-48 sm:w-32 w-28"
                  />
                </Link>
              </div>

              {/* Navigation Menu */}
              <div
                className={`md:static fixed md:z-0 z-50 bottom-0 md:bg-transparent bg-[#1a2224c6] w-full md:h-auto h-full transition-all duration-300 ${
                  menuOpen ? 'left-0' : '-left-[100vw]'
                }`}
              >
                <div className="flex md:hidden justify-end">
                  <span className="text-lg text-white p-4" onClick={toggleMenu}>
                    <IoClose />
                  </span>
                </div>

                <div className="flex md:flex-row flex-col md:items-center items-start gap-2 md:p-0 p-4">
                  {navLinks.map((item, index) => (
                    <div key={index} className="relative group px-2">
                      <span className="text-white py-3">{item.mainMenuName}</span>
                      {item.dropdownLinkList && (
                        <ul className="md:w-[150px] md:bg-white md:absolute md:top-8 md:shadow-custom p-2 rounded md:hidden md:group-hover:block">
                          {item.dropdownLinkList.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                to={subItem.subLink}
                                className="md:hover:bg-gray-100 p-1 md:text-black text-white block rounded"
                              >
                                {subItem.subName}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hamburger Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <div className="menu-btn text-white text-lg p-2" onClick={toggleMenu}>
                <TbMenu2 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
