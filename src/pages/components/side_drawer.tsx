import Link from 'next/link';
import { HiOutlinePuzzle, HiOutlineViewList } from 'react-icons/hi'

type Props = {
  className?: string;
};

const SideDrawer: React.FC<Props> = ({ className }) => {
    return (
        <div className= {`${className} h-screen drawer bg-gradient-to-b from-blue to-violet`}>
            {/*
            <ul className="mt-20">
                <li className="mb-10 px-5 hover: cursor-pointer">
                    <Link href="/">
                        <div className='flex flex-row h-fit justify-start align-middle'>
                            <HiOutlinePuzzle className='h-10 w-10 my-auto text-white'/>
                            <p className='text-xl text-center align-middle ml-2 my-auto text-white font-semibold'>Dashboard</p>
                        </div>
                    </Link>
                </li>
                <li className="px-5 hover: cursor-pointer">
                    <Link href="/">
                        <div className='flex flex-row h-fit justify-start align-middle'>
                            <HiOutlineViewList className='h-10 w-10 my-auto text-white'/>
                            <p className='text-xl text-center align-middle ml-2 my-auto text-white font-semibold'>App List</p>
                        </div>
                    </Link>
                </li>

            </ul>
            */}
        </div>
    )
};

export default SideDrawer;
