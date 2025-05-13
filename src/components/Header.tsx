import Link from "next/link";
import Image from "next/image";
import logo from "../../public/assets/images/logo.png";
import { SignInButton } from "./ui/SignInButton";
import NavLink from "./ui/NavLink";

export const Header = () => {
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
            <SignInButton />
          </div>
        </div>
      </header>
    </>
  );
};
