import React, { useState } from 'react'
import { Link } from 'react-router'
import { useUser } from '@clerk/clerk-react'

const Navbar = () => {
  const { isSignedIn, user } = useUser()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  return (
    <div className='navbar'>
       <Link to="/">
           <p className='text-2xl font-bold text-gradient'>SKILLSNAP</p>
       </Link>
       <div className='flex items-center gap-4'>
         {isSignedIn ? (
           <>
             <Link to="/upload" className='primary-button w-fit'>
               Upload Resume
             </Link>
             <Link to="/profile" className='flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-blue-600 hover:border-blue-800 transition-colors'>
               {user?.imageUrl && !imageError ? (
                 <img 
                   src={user.imageUrl} 
                   alt="Profile" 
                   className="w-full h-full object-cover"
                   loading="eager"
                   decoding="async"
                   onLoad={() => setImageLoaded(true)}
                   onError={() => setImageError(true)}
                   style={{ 
                     opacity: imageLoaded ? 1 : 0, 
                     transition: 'opacity 0.2s ease-in-out' 
                   }}
                 />
               ) : (
                 <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                   {user?.firstName?.charAt(0) || user?.emailAddresses?.[0]?.emailAddress?.charAt(0) || 'U'}
                 </div>
               )}
             </Link>
           </>
         ) : (
           <Link to="/auth/sign-in" className='primary-button w-fit'>
             Sign In
           </Link>
         )}
       </div>
    </div>
  )
}

export default Navbar