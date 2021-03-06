import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import Hamburger from './hamburguer'
import Sidebar from './sidebar'
import Dropdown from './dropdown'
import s from './styles/navbar.module.css'
import nav from '@/lib/navigation'
import { useGlobalDataContext } from '../page'

export default function Navbar() {
  const [ sidebar, setSidebar ] = useState(false)
  const [scrollY, setScrollY] = useState<number>(null)
  const toggleSidebar = () => (setSidebar(!sidebar))
  const globalData = useGlobalDataContext()

  const scrollHander = () => {
    setScrollY(window.scrollY)
  }

  useEffect(() => {
    if (scrollY === null) {
      scrollHander()
    }
    window.addEventListener('scroll', scrollHander, { passive: true })
    return () => (window.removeEventListener('scroll', scrollHander))
  })

  const navH = 96

  return (
    <header className={s.header}>
      <Sidebar open={sidebar} toggle={toggleSidebar}/>
      <div className={`${s.headerWrapper} duration-200 ${scrollY > navH && 'shadow-md'}`}>
        <div className="flex overflow-hidden pointer-events-auto">
          <Link href="/">
            <a title="Home" className="overflow-hidden text-2xl font-bold text-blue-800 duration-200 font-title transform hover:scale-95">
              FEDECAMARAS
              {/*<img
                src="/images/logo.webp"
                className="h-8 sm:h-12 duration-200 transform hover:scale-95 logo"
                alt="logo"
                loading="lazy"
              />*/}
            </a>
          </Link>
        </div>
        <div className={s.elements}>
          <div
            className="items-center hidden lg:flex duration-200 transition-all"
            style={scrollY > navH  || sidebar ? {transform: 'translate(-1rem,0)', opacity: 0, pointerEvents: 'none'} : {}}
          >
            {nav(globalData).map((n, i) => n.childrens ? (
              <Fragment key={i}>
                <Dropdown titulo={n.titulo} links={n.childrens}/>
              </Fragment>
            ) : (
              <Link href={n.href || '/'} key={i}>
                <a className="mx-4">{n.titulo}</a>
              </Link>
            ))}
          </div>
          <div
            className={`${scrollY < navH && !sidebar ? 'lg:hidden' : ''}`}
          >
            <Hamburger open={sidebar} toggle={toggleSidebar}/>
          </div>
        </div>
      </div>
    </header>
  )
}
