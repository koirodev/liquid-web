interface UseButtonProps {
  icon: string | null;
  [key: string]: any;
}

export default function (props: UseButtonProps) {
  const { component, linkProps } = useAppLink(props, 'button');

  const icon = computed(() => 'svg-' + props.icon);

  return { component, linkProps, icon };
}
