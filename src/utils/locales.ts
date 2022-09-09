import { LANGUAGES, LOCAL_USER_LANG } from "../config/constants";
import useCookies from "../hooks/useCookies";


export function getUserLang(){
    const {getCookie} = useCookies()
     return getCookie(LOCAL_USER_LANG) || LANGUAGES.enUS
};