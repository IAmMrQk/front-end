import BtnLogin from "./BtnLogin";
import BtnLogo from "./BtnLogo";
import BtnRegister from "./BtnRegister";

export default function NavPrincipal() {
  return (
    <nav className="bg-blue-900 text-white fixed top-0 left-0 w-full flex items-center justify-between p-4 z-10 shadow-md h-16">
      <div className="flex items-center">
        <BtnLogo />
      </div>
      <div className="flex items-center space-x-4">
        <BtnLogin />
        <BtnRegister />
      </div>
    </nav>
  );
}
