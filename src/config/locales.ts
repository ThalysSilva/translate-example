import { getUserLang } from "../utils/locales";
import { LANGUAGES } from "./constants";
import ptBr from "../locales/pt-BR.json";
import enUs from "../locales/en-US.json";
import esEs from "../locales/es-ES.json";

type ObjectRecursiveOf<T> = { [key: string]: ObjectRecursiveOf<T> | T };

export function getLocaleLang(localeLang?: string) {
  if (typeof localeLang === "string" && localeLang.length > 0) {
    return localeLang;
  }

  return getUserLang();
}

export function translate(key?: string) {
  const currentLanguage = getLocaleLang();
  const lang = getLanguage(currentLanguage) as ObjectRecursiveOf<string>;

  function iterateObjectOfString(
    mapOfIndexes: string[],
    objectOfString: ObjectRecursiveOf<string>
  ): string {
    if (mapOfIndexes.length <= 1) return objectOfString[mapOfIndexes[0]] as string;

    const newMap = mapOfIndexes.splice(1);
    return iterateObjectOfString(newMap, objectOfString[mapOfIndexes[0]] as ObjectRecursiveOf<string>);
  }

  if (!key) {
    return lang;
  } else {
    return iterateObjectOfString(key.split("."), lang)
  }
}

function getLanguage(language?: string) {
  switch (language) {
    case LANGUAGES.ptBR:
      return ptBr;
    case LANGUAGES.enUS:
      return enUs;
    case LANGUAGES.es:
      return esEs;
    default:
      return enUs;
  }
}
