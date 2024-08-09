import BtnLogin from "./BtnLogin";
import BtnLogo from "./BtnLogo";
import BtnRegister from "./BtnRegister";

export default function NavPrincipal() {
  return (
    <nav className="bg-blue-900 text-white fixed top-0 left-0 w-full flex justify-between p-2 z-10">
      <BtnLogo/>
      <div className="flex">
        <BtnLogin />
        <BtnRegister/>
      </div>
    </nav>
  );
}
