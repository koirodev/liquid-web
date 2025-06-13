/**
 * @description Определяет старый браузер на клиенте
 */

interface BrowserVersions {
  safari: number;
  ios: number;
  ie: number;
  edge: number;
  yandex: number;
  opera: number;
  firefox: number;
  chrome: number;
  samsung: number;
}

export default defineNuxtPlugin(() => {
  const isOldBrowser = useState<boolean>('isOldBrowser', () => false);

  const version: BrowserVersions = {
    safari: 9999,
    ios: 9999,
    ie: 11,
    edge: 91,
    yandex: 21,
    opera: 77,
    firefox: 9999,
    chrome: 91,
    samsung: 9999,
  };

  if (process.client) {
    try {
      const userAgent: string = window.navigator.userAgent || '';

      let old: boolean = false;

      if (!userAgent) {
        isOldBrowser.value = false;
        return;
      }

      // Safari
      const isSafari: boolean =
        userAgent.includes('Safari') &&
        !userAgent.includes('Chrome') &&
        !userAgent.includes('Chromium');
      const safariMatch: RegExpMatchArray | null = userAgent.match(
        /Version\/(\d+)\.(\d+)/
      );
      if (isSafari && safariMatch) {
        const safariVersion: number = parseInt(safariMatch[1]);
        if (!isNaN(safariVersion) && safariVersion < version.safari) old = true;
      }

      // iOS WebView (например, приложения с WebView)
      const iosMatch: RegExpMatchArray | null = userAgent.match(/OS (\d+)_/);
      if (iosMatch) {
        const iosVersion: number = parseInt(iosMatch[1]);
        if (!isNaN(iosVersion) && iosVersion < version.ios) old = true;
      }

      // Internet Explorer
      const isIE: boolean =
        userAgent.includes('MSIE ') || userAgent.includes('Trident/');
      if (isIE) old = true;

      // Edge (до перехода на Chromium)
      const edgeMatch: RegExpMatchArray | null = userAgent.match(/Edge\/(\d+)/);
      if (edgeMatch) {
        const edgeVersion: number = parseInt(edgeMatch[1]);
        if (!isNaN(edgeVersion) && edgeVersion < version.edge) old = true;
      }

      // Yandex Browser
      const yandexMatch: RegExpMatchArray | null =
        userAgent.match(/YaBrowser\/(\d+)/);
      if (yandexMatch) {
        const yandexVersion: number = parseInt(yandexMatch[1]);
        if (!isNaN(yandexVersion) && yandexVersion < version.yandex) old = true;
      }

      // Opera
      const operaMatch: RegExpMatchArray | null = userAgent.match(/OPR\/(\d+)/);
      if (operaMatch) {
        const operaVersion: number = parseInt(operaMatch[1]);
        if (!isNaN(operaVersion) && operaVersion < version.opera) old = true;
      }

      // Firefox
      const firefoxMatch: RegExpMatchArray | null =
        userAgent.match(/Firefox\/(\d+)/);
      if (firefoxMatch) {
        const firefoxVersion: number = parseInt(firefoxMatch[1]);
        if (!isNaN(firefoxVersion) && firefoxVersion < version.firefox)
          old = true;
      }

      // Chrome
      const chromeMatch: RegExpMatchArray | null =
        userAgent.match(/Chrome\/(\d+)/);
      if (chromeMatch) {
        const chromeVersion: number = parseInt(chromeMatch[1]);
        if (!isNaN(chromeVersion) && chromeVersion < version.chrome) old = true;
      }

      // Samsung Internet
      const samsungMatch: RegExpMatchArray | null = userAgent.match(
        /SamsungBrowser\/(\d+)/
      );
      if (samsungMatch) {
        const samsungVersion: number = parseInt(samsungMatch[1]);
        if (!isNaN(samsungVersion) && samsungVersion < version.samsung)
          old = true;
      }

      isOldBrowser.value = old;
    } catch (e: unknown) {
      console.warn('Ошибка при определении старости браузера:', e);
      isOldBrowser.value = false;
    }

    if (isOldBrowser.value) {
      document.querySelector('body')?.classList.add('_old-browser');
    }
  }

  const oldBrowserCookie = useCookie<boolean>('ignore-old-browser', {
    maxAge: 60 * 60 * 24 * 30, // 30 дней
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  return {
    provide: {
      oldBrowserCookie,
    },
  };
});
