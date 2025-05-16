"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/assets/images/logo.png";
import NavLink from "./ui/NavLink";
import Button from "./ui/Button";
import { useAuth } from "@/context/auth";

export const Header = () => {
  const { session, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <>
      <header>
        <div className="flex items-center justify-between py-4">
          <div className="w-[100px]">
            <Link href="/">
              <Image src={logo} alt="Ghatakshab"></Image>
            </Link>
          </div>
          <nav className="flex flex-row items-center space-x-4">
            <ul className="flex space-x-8">
              <NavLink link={"/"}>Home</NavLink>
              <NavLink link={"/about"}>About</NavLink>
              <NavLink link={"/faq"}>FAQ</NavLink>
              <NavLink link={"/contact"}>Contact</NavLink>
            </ul>
          </nav>

          <div>
            {session ? (
              <div className="flex items-center gap-4">
                <Button onClick={handleSignOut}>Sign Out</Button>
              </div>
            ) : (
              <Button href="/signin">Sign In</Button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
