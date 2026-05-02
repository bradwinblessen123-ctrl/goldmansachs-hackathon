import { NavLink } from 'react-router-dom'
import { LayoutDashboard, BarChart2, TrendingUp, BookOpen, Target } from 'lucide-react'

const tabs = [
  { to: '/dashboard', label: 'Home',     Icon: LayoutDashboard },
  { to: '/markets',   label: 'Markets',  Icon: TrendingUp },
  { to: '/holdings',  label: 'Portfolio', Icon: BarChart2 },
  { to: '/learn',     label: 'Learn',    Icon: BookOpen },
  { to: '/goals',     label: 'Goals',    Icon: Target },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {tabs.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => `nav-tab${isActive ? ' active' : ''}`}
        >
          <Icon size={20} strokeWidth={1.75} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
