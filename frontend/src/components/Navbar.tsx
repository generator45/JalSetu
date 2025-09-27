import { useState } from "react";
import { Globe } from "lucide-react";

const Navbar = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা", flag: "🇧🇩" },
    { code: "te", name: "తెలుగు", flag: "🇮🇳" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  return (
    <nav className="bg-blue-50 border-b border-gray-200 sticky top-0 z-50 shadow-lg">
      <div className="max-w-[90rem] mx-auto">
        <div className="flex justify-between items-center py-2">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="text-2xl font-bold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer">
              JalSetu
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-8">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:cursor-pointer">
              Check Potential
            </button>

            <button className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:cursor-pointer">
              Learn More
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-200 hover:cursor-pointer"
              >
                <Globe className="h-4 w-4" />
                <span className="hidden lg:inline">
                  {selectedLanguage.name}
                </span>
                <span className="lg:hidden">{selectedLanguage.flag}</span>
              </button>

              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        setSelectedLanguage(language);
                        setIsLanguageOpen(false);
                      }}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-left hover:bg-emerald-50 hover:cursor-pointer transition-colors focus:outline-none focus:bg-emerald-50"
                    >
                      <span className="text-lg">{language.flag}</span>
                      <span>{language.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
