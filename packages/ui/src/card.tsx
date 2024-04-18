import { type ReactNode } from "react";

export function Card({
  title,
  children,
  href,
}: {
  title?: string;
  children?: ReactNode;
  href?: string;
}): JSX.Element {
  return (
    <a className="bg-red-500">Button</a>
  );
}
