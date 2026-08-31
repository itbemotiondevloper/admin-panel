import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";
import { Route } from "next";
import { HomeIcon, SettingsIcon, SearchIcon, FileText, CheckCircle, MessageSquare, Inbox, Users, Megaphone, LogOut } from "lucide-react";
import { authService } from "@/services/auth.service";
import { usePermissions } from "@/hooks/usePermissions";
import { settingsService } from "@/services/settings.service";

interface NavbarProps {
  className?: string;
}

interface ILink {
  label: string;
  href: string;
  Icon: typeof HomeIcon;
  permission?: string;
}

const links: ILink[] = [
  {
    label: "SEO Management",
    href: "/admin/seo",
    Icon: SearchIcon,
    permission: "manage_blogs",
  },
  {
    label: "Demo Requests",
    href: "/admin/leads",
    Icon: Inbox,
    permission: "manage_leads",
  },
  {
    label: "Contact Messages",
    href: "/admin/contacts",
    Icon: MessageSquare,
    permission: "manage_contacts",
  },
  {
    label: "Announcements",
    href: "/admin/updates",
    Icon: Megaphone,
    permission: "manage_blogs",
  },
  {
    label: "Blog Posts",
    href: "/admin/blogs",
    Icon: FileText,
    permission: "manage_blogs",
  },
  {
    label: "Solutions Cards",
    href: "/admin/solutions",
    Icon: CheckCircle,
    permission: "manage_solutions",
  },
  {
    label: "Solutions Page",
    href: "/admin/solutions-page",
    Icon: FileText,
    permission: "manage_solutions",
  },
  {
    label: "Comments",
    href: "/admin/comments",
    Icon: MessageSquare,
    permission: "manage_comments",
  },
  {
    label: "Registered Users",
    href: "/admin/users",
    Icon: Users,
    permission: "manage_users",
  },
  {
    label: "Staff / Admins",
    href: "/admin/admins",
    Icon: Users,
    permission: "manage_users",
  },
  {
    label: "Roles",
    href: "/admin/roles",
    Icon: SettingsIcon,
    permission: "manage_users",
  },
  {
    label: "Settings",
    href: "/admin/settings",
    Icon: SettingsIcon,
    permission: "manage_users",
  },
];

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { hasPermission } = usePermissions();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error(err);
    }
    window.location.href = '/admin/login';
  };

  const [logoBlack, setLogoBlack] = useState('/digitory-black.png');
  const [logoWhite, setLogoWhite] = useState('/digitory-white.png');

  useEffect(() => {
    const handleBrandingSync = () => {
      const savedBlack = localStorage.getItem('branding_logo_black');
      const savedWhite = localStorage.getItem('branding_logo_white');
      if (savedBlack) setLogoBlack(savedBlack);
      if (savedWhite) setLogoWhite(savedWhite);
    };

    // Load initial values
    handleBrandingSync();

    const fetchSettings = async () => {
      try {
        const s = await settingsService.getSettings();
        if (s.branding) {
          if (s.branding.logo) {
            setLogoBlack(s.branding.logo);
            localStorage.setItem('branding_logo_black', s.branding.logo);
          }
          if (s.branding.logoWhite) {
            setLogoWhite(s.branding.logoWhite);
            localStorage.setItem('branding_logo_white', s.branding.logoWhite);
          }
        }
      } catch (err) {
        console.warn('Failed to load admin navbar branding:', err);
      }
    };
    fetchSettings();

    // Listen for real-time changes
    window.addEventListener('branding_logo_update', handleBrandingSync);
    return () => {
      window.removeEventListener('branding_logo_update', handleBrandingSync);
    };
  }, []);

  return (
    <div className={clsx("w-64 flex-shrink-0 bg-white dark:bg-[#121214] border-r border-zinc-200 dark:border-zinc-800/80 transition-colors duration-300", className)}>
      <div className="flex h-full flex-col justify-between py-6 px-4">
        
        {/* Logo/Header area */}
        <div className="mb-8 px-2">
          <Link href="/admin/seo" className="block">
            <img
              src={logoBlack}
              alt="Digitory Logo"
              className="object-contain h-7 w-auto block dark:hidden"
            />
            <img
              src={logoWhite}
              alt="Digitory Logo"
              className="object-contain h-7 w-auto hidden dark:block"
            />
          </Link>
        </div>

        {/* Main Navigation */}
        <div className="flex h-full flex-col gap-1.5 overflow-y-auto pr-2 custom-scrollbar">
          {links
            .filter(link => hasPermission(link.permission))
            .map((link, indx) => {
              // Determine active state by checking path and tab query param
              const linkUrl = new URL(link.href, 'http://localhost');
              const linkTab = linkUrl.searchParams.get('tab');
              const currentTab = searchParams.get('tab');
              
              const isTabMatch = linkTab 
                ? currentTab === linkTab 
                : !currentTab; // default match if tab is undefined
                
              const isPathMatch = pathname === linkUrl.pathname || (linkUrl.pathname !== '/admin/dashboard' && pathname.startsWith(linkUrl.pathname));
              const isActive = isPathMatch && isTabMatch;

              return (
                <NavItem key={indx} {...link} isActive={isActive} />
              );
            })}
        </div>

        {/* Bottom actions: Logout */}
        <div className="pt-6 mt-4 border-t border-zinc-150 dark:border-zinc-800/80 space-y-1">
          <button
            onClick={handleLogout}
            className="w-full flex items-center rounded-xl px-3 py-2.5 transition-all duration-200 font-bold text-[14px] text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/10 group cursor-pointer"
          >
            <LogOut size={18} className="mr-3 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" strokeWidth={2.5} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const NavItem: React.FC<ILink & { className?: string; isActive?: boolean }> = ({
  label,
  href,
  Icon,
  className,
  isActive,
}) => {
  return (
    <Link
      className={clsx(
        "flex items-center rounded-xl px-3 py-2.5 transition-all duration-200 font-semibold text-[14px]",
        isActive 
          ? "bg-[#FFF3EF] dark:bg-orange-950/20 text-[#FF4F18]" 
          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white",
        className,
      )}
      href={href}
    >
      <Icon size={18} className="mr-3 shrink-0" strokeWidth={isActive ? 2.5 : 2} />
      {label}
    </Link>
  );
};

export default Navbar;
