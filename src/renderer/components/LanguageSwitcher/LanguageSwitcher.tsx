// libraries
import React from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <div style={{ display: "flex", gap: 4 }}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          style={{
            width: 32,
            height: 24,
            borderRadius: 4,
            fontSize: 11,
            fontWeight: 600,
            background: i18n.language === lang.code ? "var(--accent)" : "var(--bg-card)",
            color: i18n.language === lang.code ? "white" : "var(--text-secondary)",
            border: "1px solid var(--border)",
          }}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
