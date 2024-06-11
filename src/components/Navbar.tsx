import { fetchJson } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import useUser from "../hooks/user";

import { FC } from "react";
import useSignOut from "@/hooks/useSignOut";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const user = useUser();
  const signOut = useSignOut();

  console.log("[Navbar] user", user);
  return (
    <nav className='px-2 py-1' text-sm>
      <ul className='flex justify-between items-center'>
        <li className='text-lg font-extrabold'>
          <Link href='/'>Next Shop</Link>
        </li>
        <li role='separator' className='flex-1'></li>
        {user ? (
          <>
            <li>
              <Link href='/cart'>Cart</Link>
            </li>
            <li>{user.name}</li>
            <li>
              <button onClick={signOut}>Sign Out</button>
            </li>
          </>
        ) : (
          <li>
            <Link href='/sign-in'>Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
