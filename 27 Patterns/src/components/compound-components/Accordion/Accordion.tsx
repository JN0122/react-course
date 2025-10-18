import React, { createContext, useContext, useState } from "react";

import AccordionItem from "./AccordionItem";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const AccordionContext = createContext({
  openItemId: null as string | null,
  toggleItem: (id: string) => {},
});

export const useAccordionContext = () => {
  const ctx = useContext(AccordionContext);

  if (!ctx)
    throw new Error(
      "useAccordionContext must be used within an AccordionProvider"
    );

  return ctx;
};

function Accordion({ children, className }: Props) {
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  const toggleItem = (id: string) =>
    setOpenItemId((prev) => (prev !== id ? id : null));

  return (
    <AccordionContext.Provider value={{ openItemId, toggleItem }}>
      <ul className={className}>{children}</ul>
    </AccordionContext.Provider>
  );
}

Accordion.Item = AccordionItem;

export default Accordion;
