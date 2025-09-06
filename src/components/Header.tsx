import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navigation = [
    { name: t("nav.home"), key: "home" },
    { name: t("nav.about"), key: "about" },
    { name: t("nav.programs"), key: "programs" },
    { name: t("nav.resources"), key: "resources" },
    { name: t("nav.notice"), key: "notice" },
    { name: t("nav.gallery"), key: "gallery" },
    { name: t("nav.contact"), key: "contact" },
  ];

  const handlePageChange = (page: string) => {
    onPageChange(page);
    setIsMenuOpen(false);
  };

  const handleDonateClick = () => {
    const message = encodeURIComponent(t("cta.donateNowMessage"));
    window.open(`https://wa.me/918423370548?text=${message}`, "_blank");
  };

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handlePageChange("home")}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <ImageWithFallback
              src="/assets/lo.png"
              alt="Madarsa Arabia Logo"
              className="w-13 h-12 rounded-lg object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-[#0B0D0E]">{t("hero.title")}</h1>
              <p className="text-sm text-[#1F7A53]">{t("hero.tagline")}</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex space-x-1">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Button
                    variant={currentPage === item.key ? "default" : "ghost"}
                    onClick={() => handlePageChange(item.key)}
                    className={`relative px-4 py-2 transition-all duration-300 ${
                      currentPage === item.key
                        ? "bg-[#1F7A53] text-white shadow-lg"
                        : "text-gray-700 hover:text-[#1F7A53] hover:bg-[#E8F5EF]"
                    }`}
                  >
                    {item.name}
                  </Button>
                </motion.div>
              ))}
            </nav>

            {/* Language Switcher */}
    <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" size="sm" className="ml-2">
      {t("common.language")} ({language.toUpperCase()})
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
    <DropdownMenuItem onClick={() => setLanguage("ur")}>اردو</DropdownMenuItem>
    <DropdownMenuItem onClick={() => setLanguage("hi")}>हिन्दी</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>



            {/* Donate Now */}
            <Button
              onClick={handleDonateClick}
              className="bg-[#1F7A53] hover:bg-[#1F7A53]/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Heart className="w-4 h-4 mr-2" />
              {t("common.donateNow")}
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Language Selector */}
          <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" size="sm" className="ml-2">
      {/* Mobile: Language (Selected) | Desktop: Languages */}
      <span className="block sm:hidden">{t("common.language")} ({language.toUpperCase()})</span>
      <span className="hidden sm:block">{t("common.language")}</span>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
    <DropdownMenuItem onClick={() => setLanguage("ur")}>اردو</DropdownMenuItem>
    <DropdownMenuItem onClick={() => setLanguage("hi")}>हिन्दी</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>


            {/* Mobile Donate */}
            <Button size="sm" onClick={handleDonateClick} className="bg-[#1F7A53] text-white">
              <Heart className="w-4 h-4" />
            </Button>

            {/* Hamburger */}
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-2">
            {navigation.map((item) => (
              <Button
                key={item.key}
                variant={currentPage === item.key ? "default" : "ghost"}
                onClick={() => handlePageChange(item.key)}
                className="w-full justify-start"
              >
                {item.name}
              </Button>
            ))}
          </nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;