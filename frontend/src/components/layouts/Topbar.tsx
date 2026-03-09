import { Menu, X } from "lucide-react";
import logo from "../../assets/logo-white.svg";

interface TopbarProps {
  onMenuToggle?: () => void;
  isSidebarOpen?: boolean;
}

export default function Topbar({ onMenuToggle, isSidebarOpen }: TopbarProps) {
  return (
    <header className="flex w-full h-16 bg-primary items-center px-5 justify-between font-lexend z-20 shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden text-white p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <img
          src={logo}
          alt="app logo"
          className="h-9 sm:h-10 md:h-11 lg:h-13"
        />
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <div className="hidden sm:block border-r-2 border-[#941616] h-8" />
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="hidden sm:block text-white font-bold text-sm leading-tight">
              google@email.com
            </p>
            <p className="text-white/70 text-xs">ADMIN</p>
          </div>

          {/* Avatar */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-white border-2 border-yellow rounded-full shrink-0" />
        </div>
      </div>
    </header>
  );
}
