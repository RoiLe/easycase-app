import React from "react";
import Button from "../ui/Button";
import { Menu } from "lucide-react";
import { useTranslation } from 'react-i18next';
import LanguageSelector from "./LanguageSelector";

export default function Header({ menuOpen, setMenuOpen, scrollToSection }) {

const { t } = useTranslation();
const sectorsList = t("sectors", { returnObjects: true });

 return (
  <header className="p-4 bg-neutral-300 shadow-md flex justify-between items-center sticky top-0 z-50">
    <div className="text-2xl font-extrabold tracking-tight text-gray-800">easyCase</div>
    
    <div className="flex items-center gap-4 relative"> {/* <-- Flex container for LanguageSelector and Menu */}

      <LanguageSelector />

      <Button variant="ghost" onClick={() => setMenuOpen(prev => !prev)}>
        <Menu />
      </Button>

      {menuOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <ul className="flex flex-col">
            {sectorsList.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    scrollToSection(id);
                    setMenuOpen(false);
                  }}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </header>
);

}
