import { useEffect } from 'react';
import { useRouter } from 'next/router';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

export default function Page() {
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (router.locale && i18n.language !== router.locale) {
      i18n.changeLanguage(router.locale);
    }
  }, [router.locale]);

  return <h1>{t('title')}</h1>;
}
