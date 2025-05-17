"use client"
import { UserButton } from '@clerk/nextjs'
import React, { useEffect} from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from "next/link";

function Header() {

    const path=usePathname();
    useEffect(()=>{
        console.log(path)
    },[])

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/questions", label: "Courses" },
    { href: "/dashboard/upgrade", label: "Upgrade" },
  ];

  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
        <Image src={'/PrepBot_logo.svg'} width={160} height={100} alt='logo'/>
        <ul className="hidden md:flex gap-6">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`hover:text-[#3333ff] hover:font-bold transition-all cursor-pointer ${
                path === link.href ? "text-[#3333ff] font-bold" : ""
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <a
            href="https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#3333ff] hover:font-bold transition-all cursor-pointer"
          >
            Coding Practice
          </a>
        </li>
      </ul>
        <UserButton/>
    </div>
  )
}

export default Header