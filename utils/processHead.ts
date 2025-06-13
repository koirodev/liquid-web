import { SEO_TITLE_SUFFIX } from '~/config';

interface ProcessHeadProps {
  title?: string;
  description?: string;
  postfix?: boolean;
}

export default function processHead(props: ProcessHeadProps = {}) {
  const config = useRuntimeConfig();

  const title = (title: string) => {
    if (typeof title === 'string' && title) {
      return `${title}${postfix()}`;
    }

    return '';
  };

  const postfix = () => {
    if (props.postfix !== false) {
      return SEO_TITLE_SUFFIX ? ` | ${SEO_TITLE_SUFFIX}` : '| Prismium';
    }

    return '';
  };

  return {
    title: title(props.title || ''),
    link: [
      {
        rel: 'canonical',
        href: `${config.public?.siteUrl || ''}${useRoute().path}`,
      },
    ],
    meta: [
      {
        name: 'description',
        content: typeof props.description === 'string' ? props.description : '',
      },
      {
        name: 'robots',
        content: isRobots() ? 'index, follow' : 'noindex, nofollow',
      },
    ],
  };
}
