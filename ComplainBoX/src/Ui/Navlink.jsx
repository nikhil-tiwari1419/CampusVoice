// navLinks.js — shared data used by DesktopNavbar & MobileNavbar
import { House, Music, Album, User, ArrowUpFromLine, Users, Headphones, HelpCircle } from 'lucide-react'

export const PUBLIC_LINKS = [
    { label: 'Home', section: 'home', icon: House },
    { label: 'For Artists', section: 'artist-workflow', icon: Headphones },
    { label: 'For Listeners', section: 'listener-workflow', icon: Users },
    { label: 'FAQs', section: 'faqs', icon: HelpCircle },
]

export const USER_LINKS = [
    { label: 'Home', path: '/user-Dashboard', icon: House },
    { label: 'Music Feed', path: '/Local-Feed', icon: Music },
    { label: 'Album', path: '/album', icon: Album },
    { label: 'Artist', path: '/artist', icon: Users },
    { label: 'Profile', path: '/Profile', icon: User },
]

export const ADMIN_LINKS = [
    { label: 'Home', path: '/artist-Dashboard', icon: House },
    { label: 'Upload', path: '/create-music', icon: ArrowUpFromLine },
    { label: 'Album', path: '/Artist-album', icon: Album },
    { label: 'My Posts', path: '/your-post', icon: User },
    { label: 'Profile', path: '/Profile', icon: User },
]

