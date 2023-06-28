import Link from 'next/link'
import { buttonVariants } from './ui/Button'
import { GiSewingNeedle } from 'react-icons/gi'
import { UserAccountNav } from './UserAccountNav'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const Navbar = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div className='fixed inset-x-0 top-0 border-2 border-black h-fit bg-zinc-300 z-[10] py-2'>
      <div className='container flex items-center justify-between h-full gap-2 mx-auto max-w-7xl'>
        <Link
          href='/'
          className='flex items-center gap-2'
        >
          <GiSewingNeedle className='h-8 w-9 sm:h-6 sm:w-6' />
          <p className='hidden text-sm font-medium text-zinc-700 md:block'>Threddit</p>
        </Link>

        {/* Search Bar */}

        {/* Actions */}
        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link
            href='/signin'
            className={buttonVariants()}
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
