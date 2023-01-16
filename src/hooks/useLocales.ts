import { LANGUAGES, LOCAL_USER_LANG } from "../config/constants";
import ptBr from "../locales/pt-BR.json";
import enUs from "../locales/en-US.json";
import esEs from "../locales/es-ES.json";
import useCookies from "./useCookies";
import { useEffect, useState } from "react";
import { ObjectRecursiveOf } from "../@types/objects";

export function useLocale() {
  const [userLang, setUserLang] = useState<string>(LANGUAGES.ptBR);
  const { getCookie, setCookie } = useCookies();

  useEffect(() => {
    async function loadUserLangFromCookies() {
      if (typeof document !== "undefined") {
        const userLangCookie = getCookie(LOCAL_USER_LANG);

        if (userLangCookie) {
          setUserLang(userLangCookie);
        }
      }
    }
    loadUserLangFromCookies();
  }, []);

  function getLanguage(language?: string) {
    switch (language) {
      case LANGUAGES.ptBR:
        return ptBr;
      case LANGUAGES.enUS:
        return enUs;
      case LANGUAGES.es:
        return esEs;
      default:
        return ptBr;
    }
  }

  function changeLanguage(lang: "en-US" | "es" | "pt-BR") {
    setUserLang(setCookie(LOCAL_USER_LANG, lang));
  }

  function getLocaleLang(localeLang?: string) {
    if (typeof localeLang === "string" && localeLang.length > 0) {
      return localeLang;
    }

    return userLang;
  }

  function translate(key: string) {
    const currentLanguage = getLocaleLang();
    const lang = getLanguage(currentLanguage) as ObjectRecursiveOf<string>;

    function iterateObjectOfString(
      mapOfIndexes: string[],
      objectOfString: ObjectRecursiveOf<string>
    ): string {
      if (mapOfIndexes.length <= 1)
        return objectOfString[mapOfIndexes[0]] as string;

      const newMap = mapOfIndexes.splice(1);
      return iterateObjectOfString(
        newMap,
        objectOfString[mapOfIndexes[0]] as ObjectRecursiveOf<string>
      );
    }

    return iterateObjectOfString(key.split("."), lang);
  }

  return { getLanguage, translate, getLocaleLang, changeLanguage, userLang };
}
