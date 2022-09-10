export default function useCookies() {
  function setCookie(keyName: string, storeValue: string, daysToExpire = 1) {
    const MILLISECONDS = 1000;
    const SECONDS = 60;
    const MINUTES = 60;
    const HOURS = 24;
    let expires = "";

    if (daysToExpire) {
      const date = new Date();
      date.setTime(
        date.getTime() + daysToExpire * HOURS * MINUTES * SECONDS * MILLISECONDS
      );
      expires = "; expires=" + date.toUTCString();
    }

    document.cookie = keyName + "=" + (storeValue || "") + expires + "; path=/";
    return storeValue
  }
  
  function getCookie(keyName: string) {
    const allCookies = document.cookie.split("; ");
    const cookieString = allCookies.filter((cookie) =>
      cookie.startsWith(keyName)
    )[0];
    if (cookieString) return cookieString.split(/=(.*)/s)[1];

    return "";
  }
  return { setCookie, getCookie };
}
