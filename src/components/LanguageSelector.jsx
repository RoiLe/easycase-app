// src/components/LanguageSelector.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select value={i18n.language} onChange={changeLanguage} className="bg-slate-400 hover:bg-slate-500 text-white font-semibold py-2 px-4">
      <option value="en">EN</option>
      <option value="he">HE</option>
      {/* Add more languages here */}
    </select>
  );
};

export default LanguageSelector;
