import Link from "next/link";
// Import icons from Heroicons (Hi)
import { 
  HiHome, 
  HiCollection, 
  HiStar, 
  HiInformationCircle, 
  HiUser 
} from "react-icons/hi";

export default function Footer() {
  return (
    // Added z-10 to ensure footer is always on top
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-xl border-t flex justify-around py-2.5 z-10">
      
      {/* 1. Home Link */}
      <Link 
        href="/" 
        className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition p-1"
      >
        <HiHome className="w-6 h-6" /> {/* Icon above text */}
        <span className="text-xs font-medium mt-0.5">Home</span>
      </Link>

      {/* 2. Works Link */}
      <Link 
        href="/works" 
        className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition p-1"
      >
        <HiCollection className="w-6 h-6" />
        <span className="text-xs font-medium mt-0.5">Works</span>
      </Link>

      {/* 3. Membership Link */}
      <Link 
        href="/membership" 
        className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition p-1"
      >
        <HiStar className="w-6 h-6" />
        <span className="text-xs font-medium mt-0.5">Membership</span>
      </Link>

      {/* 4. About Link */}
      <Link 
        href="/about" 
        className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition p-1"
      >
        <HiInformationCircle className="w-6 h-6" />
        <span className="text-xs font-medium mt-0.5">About</span>
      </Link>

      {/* 5. Profile Link */}
      <Link 
        href="/profile" 
        className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition p-1"
      >
        <HiUser className="w-6 h-6" />
        <span className="text-xs font-medium mt-0.5">Profile</span>
      </Link>
    </nav>
  );
}