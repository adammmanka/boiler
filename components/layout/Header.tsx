import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {Navbar, Dropdown, Button, Indicator, Badge } from 'react-daisyui'
import ThemeSelect from "./ThemeSelect";

const Header = () => {
  return (
<div className="pb-40 flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
      <Navbar >
        <Navbar.Start>
          <Dropdown>
            <Button color="ghost" shape="circle" tabIndex={0}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </Button>
            <Dropdown.Menu tabIndex={0} className="menu-compact w-52">
              <Dropdown.Item>Homepage</Dropdown.Item>
              <Dropdown.Item>Portfolio</Dropdown.Item>
              <Dropdown.Item>About</Dropdown.Item>
              <Dropdown.Item><ThemeSelect /></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Start>
        <Navbar.Center>
          <Button color="ghost" className="normal-case text-xl">
            BoilerApp
          </Button>
        </Navbar.Center>
        <Navbar.End className="navbar-end">
          <ConnectButton />
          {/* <Button color="ghost" shape="circle">
            <Indicator item={<Badge size="xs" color="primary" />}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </Indicator>
          </Button> */}
        </Navbar.End>
      </Navbar>
    </div>
  );
};

export default Header;
