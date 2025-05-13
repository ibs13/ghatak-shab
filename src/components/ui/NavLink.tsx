import Link from "next/link";
import { ReactNode } from "react";

interface NavLinkProps {
  children: ReactNode;
  link: string;
}

const NavLink: React.FC<NavLinkProps> = ({ children, link }) => {
  return (
    <>
      <li>
        <Link
          href={link}
          className="text-[#824670] hover:text-[#bf98a0] font-semibold text-md"
        >
          {children}
        </Link>
      </li>
    </>
  );
};

export default NavLink;
