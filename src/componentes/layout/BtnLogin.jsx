import { FaArrowRightToBracket } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function BtnLogin() {
  let navigation = useNavigate();

  const handleLogin = () => {
    navigation("/Login");
  };

  return (
    <button
      className="mx-3 flex bg-blue-800 py-1 px-3 rounded-xl hover:bg-blue-600 hover:text-slate-200"
      onClick={handleLogin}
    >
      <FaArrowRightToBracket size={"20"} className="mx-2" />
      Login
    </button>
  );
}
