import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import Link from 'next/link';
import logo from "../../public/Dream Wedding Logo_20240417_103338_0000.png"

const Navbar: React.FC = () => {
  return (
    <nav className=" z-50 w-full h-20 shadow-xl bg-slate-100 ">
      <div className="flex justify-between gap-4 items-center h-full font-semibold w-full px-2 2xl:px-14 xl:px-10">
        <div className='cursor-pointer flex '>
          <Link href='/'>
            <Image
              width={500}
              height={500}
              src={logo}
              alt='Dream Wedding logo'
              className='w-80 cursor-pointer '
            />
          </Link>
        </div>
        <div>
          <ul className="flex gap-6 items-center cursor-pointer ">
            <li className='hidden md:flex'>
              <Link href="/">Home</Link></li>
            <li className='hidden md:flex'>
              <Link href="/BanquetHall">Banquet Halls</Link>
            </li>
            <Link href="/Caterers">
            <li className='hidden md:flex'>Caterer</li>
            </Link>
            <Link href="/Decorators">
            <li className='hidden md:flex'>Decorators</li>
            </Link>
            <li className='hidden md:flex'>
              <Link href="/Photographers">Photographers</Link>
            </li>
            <li className='border p-2 rounded-sm text-blue-500 bg-blue-100'>
              Login /SignUp
            </li>
            <li>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </li>
          </ul>
        </div>
      </div>
      {/* <div className='font-semibold bottom-0 w-full h-20 shadow-xl bg-slate-100  fixed md:hidden' style={{ boxShadow: '0px -4px 6px rgba(0, 0, 0, 0.1)' }}>
        <ul className='flex justify-between items-center h-full text-sm px-3'>
          <li>
          <Link href="/">
          <RiHome3Line className="text-2xl w-full items-center"/>
          Home</Link></li>
          <li>Banquet Halls</li>
          <li>Caterer</li>
          <li>Decorators</li>
          <li>Photographers</li>
        </ul>
      </div> */}

    </nav>
  );
};

export default Navbar;
