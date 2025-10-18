import React from "react";

import { useAccordionContext } from "./Accordion";

type Props = {
  id: string;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export default function AccordionItem({
  id,
  title,
  children,
  className,
}: Props) {
  const { toggleItem, openItemId } = useAccordionContext();

  const isActiveItem = openItemId === id;

  const handleItemClick = () => toggleItem(id);

  let contentClasses = "accordion-item-content";
  if (isActiveItem) contentClasses = `${contentClasses} open`;

  return (
    <li className={className}>
      <h3 onClick={handleItemClick} style={{ cursor: "pointer" }}>
        {title}
      </h3>
      <div className={contentClasses}>{children}</div>
    </li>
  );
}
