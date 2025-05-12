import Link from "next/link";
import Image from "next/image";
import logo from "../../public/assets/images/logo.png"; // Adjust the path as necessary

export const Header = () => {
  return (
    <>
      <header>
        <div className="flex items-center justify-between py-2">
          <div className="w-[120px]">
            <Link href="/">
              <Image src={logo} alt="Ghatakshab"></Image>
            </Link>
          </div>
          <nav className="flex flex-row items-center space-x-4">
            <ul className="flex space-x-4">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
          <div>
            <button>Login</button>
            <button>Sign Up</button>
          </div>
        </div>
      </header>
    </>
  );
};
