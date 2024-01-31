type IconProp = { className?: string; color?: string };

type Option<T = unknown> = { label: string; value: T };

type ChildProps<T = unknown> = { children: React.ReactNode } & T;
