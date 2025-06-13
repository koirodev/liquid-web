import type { Ref } from 'vue';

interface NpmOperationalInternal {
  tmp: string;
}

interface NpmData {
  version: string;
  _npmOperationalInternal?: NpmOperationalInternal;
  [key: string]: any;
}

export const useNPMStore = defineStore('npm', () => {
  const packageUrl: Ref<string> = ref(
    'https://www.npmjs.com/package/liquid-web'
  );
  const data: Ref<NpmData | null> = ref(null);
  const version: Ref<string> = ref('1.0.0');
  const versionPrefix: Ref<string> = ref('v');

  const releaseDateRaw: Ref<Date | null> = ref(null);

  const releaseDate = computed<string | null>(() => {
    if (!releaseDateRaw.value) return null;

    const localeMap: Record<string, string> = {
      en: 'en-US',
    };
    const currentLocale = localeMap['en-US'] || 'en-US';

    return new Intl.DateTimeFormat(currentLocale, {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(releaseDateRaw.value);
  });

  async function fetchData(): Promise<void> {
    try {
      const { data: npmjs } = await useAsyncData<NpmData>('npmjs-latest', () =>
        $fetch<NpmData>('https://registry.npmjs.org/liquid-web/latest')
      );
      if (npmjs.value) {
        data.value = npmjs.value;
        version.value = npmjs.value.version;

        if (
          npmjs.value._npmOperationalInternal &&
          npmjs.value._npmOperationalInternal.tmp
        ) {
          const timestampMatch =
            npmjs.value._npmOperationalInternal.tmp.match(/\d{13}/);
          if (timestampMatch) {
            releaseDateRaw.value = new Date(parseInt(timestampMatch[0]));
          }
        } else {
          releaseDateRaw.value = new Date();
        }
      }
    } catch (error) {
      console.error('Failed to fetch package version:', error);
    }
  }

  if (!data.value) {
    fetchData();
  }

  return {
    packageUrl,
    data,
    version,
    versionPrefix,
    releaseDate,
  };
});
