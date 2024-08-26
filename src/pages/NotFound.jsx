import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
    const { t } = useTranslation();
  useEffect(() => {
    document.title = `Flappy Bird - Not Found`;
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-full text-center p-3">
      <h1 className="text-8xl  text-white ">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800">{t("Page Not Found")}</h2>
      <p className="text-lg text-gray-600">{t("Sorry, the page you are looking for does not exist.")}</p>
      <Link to="/" className="text-blue-500 hover:text-blue-700 font-medium text-lg">
        {t("Return to home page")}
      </Link>
    </div>
  );
};

export default NotFound;
