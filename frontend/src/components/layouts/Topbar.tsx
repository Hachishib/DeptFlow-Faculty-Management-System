import logo from "../../assets/logo-white.svg";

export default function Topbar() {
  return (
    <header className="flex w-full h-16 bg-primary items-center p-5 justify-between font-lexend z-20">
      <img src={logo} alt="app logo" className="h-13" />
      <div className="flex gap-10">
        <div className="border-r-2 border-[#941616] "></div>
        <div className="flex gap-3">
          {/* google acct name */}
          <div>
            <p className="text-white font-bold text-sm">google@email.com</p>
            <p className="text-white/70 text-right text-xs">ADMIN</p>
          </div>
          {/* google acct photo */}
          <div className="w-11 h-11 bg-white border-2 border-yellow rounded-full"></div>
        </div>
      </div>
    </header>
  );
}
