// navLinks.js — shared data used by DesktopNavbar & MobileNavbar
import { House, BookOpen, HelpCircle, User, ArrowUpFromLine, Users, Headphones, BarChart3 } from 'lucide-react'

export const PUBLIC_LINKS = [
    { label: 'Home', section: 'home', icon: House },
    { label: 'How to Use', section: 'howtouse', icon: BookOpen },
    { label: 'FAQs', section: 'faqs', icon: HelpCircle },
    { label: 'Contact', section: 'contact', icon: Headphones },
]

export const USER_LINKS = [
    { label: 'Home', path: '/userdashboard', icon: House },
    { label: 'Profile', path: '/userprofile', icon: User },
    { label: 'Create Complaint', path: '/complain', icon: BarChart3 },
    { label: 'My Complaints', path: '/allstudentcomplain', icon: Users },
    { label: 'Feedback', path: '/feedback', icon: Headphones },
]

export const ADMIN_LINKS = [
    { label: 'Home', path: '/admindashboard', icon: House },
    { label: 'Profile', path: '/adminprofile', icon: User },
    { label: 'Students', path: '/allstudent', icon: Users },
    { label: 'New Complaints', path: '/newcomplain', icon: ArrowUpFromLine },
    { label: 'Resolved', path: '/completedcomplain', icon: BarChart3 },
]

