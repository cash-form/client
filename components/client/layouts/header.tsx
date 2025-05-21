import Linker from "components/common/link/linker";
import { PageUrlConfig } from "src/config/page.config";
import ClientMenu from "./menu.tsx";

export default function Header() {
  return (
    <header className="z-30 fixed w-full h-14 flex items-center justify-between px-4 border-b border-gray-300 bg-white">
      <div className="flex items-center justify-start gap-16">
        <Linker
          href={PageUrlConfig.HOME}
          className="w-fit h-fit flex  gap-3 items-center hover:opacity-80 transition-opacity duration-100 ease-in-out delay-0"
        >
          <img
            src="/logos/cash_form_icon.svg"
            alt="cash form logo"
            className="w-8 h-8 object-contain"
          />
          <h1 className="text-xl font-bold">CASH FORM</h1>
        </Linker>
        <ClientMenu />
      </div>
      <div className="w-fit h-full flex items-center justify-end gap-4 py-3">
        <Linker
          href={PageUrlConfig.SIGN_IN}
          className="w-20 h-full flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity duration-100 ease-in-out delay-0"
        >
          <p className="text-lg text-primary font-bold">로그인</p>
        </Linker>
      </div>
    </header>
  );
}
