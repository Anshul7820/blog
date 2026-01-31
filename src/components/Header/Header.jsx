import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const navigate = useNavigate()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const authStatus = useSelector((state) => state.auth.status)

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: 'Signup',
      slug: "/signup",
      active: !authStatus
    },
    {
      name: 'All Posts',
      slug: "/all-posts",
      active: authStatus
    },
    {
      name: 'Add Post',
      slug: "/add-post",
      active: authStatus
    },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className=' p-3 shadow bg-[#0A2647]'>
      <Container>
        <nav className='flex flex-wrap justify-end gap-2 text-sm  md:text-base items-center'>
          <div className='flex items-center'>
            <Link to='/'>
              <Logo width='70px' color='#3B82F6' />
            </Link>
          </div>
          <button
            onClick={toggleMenu}
            className='md:hidden p-2 rounded-lg text-white hover:bg-blue-600 transition-colors'
            aria-label='Toggle menu'
          >
            {isMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
          <ul className='hidden md:flex ml-auto items-center space-x-2'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='px-4 py-2 text-sm md:text-base duration-200 hover:bg-blue-600 active:scale-95 transition-all rounded-full border border-blue-500 text-white hover:text-white '
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className='md:hidden w-full mt-4 bg-[#0A2647] rounded-lg shadow-lg'>
              <ul className='flex flex-col space-y-3 py-4 px-2'>
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          navigate(item.slug)
                          setIsMenuOpen(false)
                        }}
                        className='w-full text-left px-4 py-3 text-white hover:bg-blue-600 rounded-lg transition-colors text-base font-medium'
                      >
                        {item.name}
                      </button>
                    </li>
                  ) : null
                )}
                {authStatus && (
                  <li className='pt-2 border-t border-blue-800'>
                    <div
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LogoutBtn />
                    </div>
                  </li>
                )}
              </ul>
            </div>
          )}
        </nav>
      </Container>
    </header>
  )
}

export default Header
