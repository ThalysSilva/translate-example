import type { NextPage } from "next";
import { useLocale } from "../hooks/useLocales";

const Home: NextPage = () => {
  const { translate, changeLanguage } = useLocale();

  function changeLanguageToEnglish() {
    changeLanguage("es-US")
  }

  function changeLanguageToSpanish() {
    changeLanguage("es")
  }

  function changeLanguageToPortuguese() {
    changeLanguage("pt-BR")
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="h-[100px] flex w-full bg-green-400 justify-between">
          <span className="bg-black flex justify-center items-center h-full text-center">{translate("TITLE.TEST")}</span>
          <span className="bg-black flex justify-center items-center h-full text-center">{translate("TITLE.TEST2")}</span>

        <div className="flex gap-2">
          <button className="bg-red-600" onClick={changeLanguageToSpanish}>
            {"MUDAR PARA ESPANHOL"}
          </button>
          <button className="bg-red-600" onClick={changeLanguageToPortuguese}>
            {"MUDAR PARA PORTUGUES"}
          </button>
          <button className="bg-red-600" onClick={changeLanguageToEnglish}>
            {"MUDAR PARA INGLES"} 
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
