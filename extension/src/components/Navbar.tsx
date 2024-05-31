import { Sparkles } from 'lucide-react'
import Settings from './Settings'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between border-b border-border h-14 px-5 sticky top-0 bg-background z-10">
      <div className="flex items-center gap-1.5">
        <Sparkles className="text-teal-600 w-6 h-6" />
        <span className="font-bold">ChatTube</span>
      </div>
      <Settings />
    </nav>
  )
}

export default Navbar
