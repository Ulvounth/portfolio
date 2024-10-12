"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setNavbarOpen(!navbarOpen);
  };

  const isActive = (href: string) => pathname === href;

  return (
    <header className="bg-background sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <div className="relative w-12 h-12">
              <Image
                src="/images/logo-new.webp"
                alt="Logo"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
                className="rounded"
              />
            </div>
          </Link>
        </div>

        <button
          className="text-gray-300 block md:hidden"
          onClick={toggleMobileMenu}
        >
          <svg
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {navbarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <div
          className={`fixed top-0 right-0 h-full bg-gray-900 text-white w-1/2 transform transition-transform duration-300 ease-in-out ${
            navbarOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden z-50`}
        >
          <button
            className="absolute top-4 right-4 text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <ul className="mt-12 space-y-6 px-6">
            <li>
              <Link
                href="/"
                className={`block text-lg ${
                  isActive("/") ? "border-b-2 border-primary" : ""
                }`}
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className={`block text-lg ${
                  isActive("/projects") ? "border-b-2 border-primary" : ""
                }`}
                onClick={toggleMobileMenu}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`block text-lg ${
                  isActive("/about") ? "border-b-2 border-primary" : ""
                }`}
                onClick={toggleMobileMenu}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`block text-lg ${
                  isActive("/contact") ? "border-b-2 border-primary" : ""
                }`}
                onClick={toggleMobileMenu}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/projects"
                className={`hover:text-primary ${
                  isActive("/projects") ? "border-b-2 border-primary" : ""
                }`}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`hover:text-primary ${
                  isActive("/about") ? "border-b-2 border-primary" : ""
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`hover:text-primary ${
                  isActive("/contact") ? "border-b-2 border-primary" : ""
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
