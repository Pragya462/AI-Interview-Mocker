"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary pt-6 pb-4 shadow-inner">
      <div className="container mx-auto px-9">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0 max-w-sm">
            <Image src={"/PrepBot_logo.svg"} width={120} height={60} alt="PrepBot logo" />
            <p className="text-gray-600 mt-4 text-sm">
              PrepBot helps you prepare for interviews, exams, and assessments with AI-powered practice questions and personalized feedback.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-gray-600 hover:text-[#3333ff] transition-all">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/questions" className="text-gray-600 hover:text-[#3333ff] transition-all">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/dashboard/upgrade" className="text-gray-600 hover:text-[#3333ff] transition-all">
                  Upgrade
                </Link>
              </li>
              <li>
                <a 
                  href="https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#3333ff] transition-all text-gray-600"
                >
                  Coding Practice
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-600 hover:text-[#3333ff] transition-all">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-[#3333ff] transition-all">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-[#3333ff] transition-all">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-[#3333ff] transition-all">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-[#3333ff] transition-all">
                <span className="sr-only">Twitter</span>
                <i className="fab fa-twitter h-6 w-6"></i>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#3333ff] transition-all">
                <span className="sr-only">LinkedIn</span>
                <i className="fab fa-linkedin h-6 w-6"></i>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#3333ff] transition-all">
                <span className="sr-only">GitHub</span>
                <i className="fab fa-github h-6 w-6"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-4 pt-4 text-center">
          <p className="text-sm text-blue-700">
            <strong>©️ {currentYear} PrepBot. All rights reserved.</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
