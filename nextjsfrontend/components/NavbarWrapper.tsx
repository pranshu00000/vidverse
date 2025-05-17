"use client"

import { usePathname } from 'next/navigation';
import Header from "@/components/Header";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const noNavbarRoutes = ['/login', '/signup']; 
  const showNavbar = !noNavbarRoutes.includes(pathname);
  
  return showNavbar ? <Header /> : null;
}