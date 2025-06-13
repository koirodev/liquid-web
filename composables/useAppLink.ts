import { NuxtLink } from '#components';

interface UseAppLinkProps {
  to?: string;
  [key: string]: any;
}

type NotLinkComponent = string | object;

interface UseAppLinkReturn {
  component: ComputedRef<string | typeof NuxtLink | NotLinkComponent>;
  linkProps: ComputedRef<Record<string, any>>;
}

export default function useAppLink(
  props: UseAppLinkProps,
  notLinkComponent: NotLinkComponent = 'span'
): UseAppLinkReturn {
  const component = computed(() => {
    if (!props.to || typeof props.to !== 'string') return notLinkComponent;
    return props.to.startsWith('http') ? 'a' : NuxtLink;
  });

  const linkProps = computed(() => {
    if (!props.to || typeof props.to !== 'string') return {};
    return props.to.startsWith('http')
      ? { href: props.to, target: '_blank' }
      : { to: props.to };
  });

  return { component, linkProps };
}
