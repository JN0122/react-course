import { ChangeEvent, useState } from "react";

type Props<T> = {
  items: T[];
  children: (item: T) => React.ReactNode;
  itemKeyfn: (item: T) => string;
};

export default function SearchableList<T>({
  items,
  itemKeyfn,
  children,
}: Props<T>) {
  const [searchedText, setSearchedText] = useState<string>("");

  const searchResults = items.filter((item) =>
    JSON.stringify(item)
      .toLocaleLowerCase()
      .includes(searchedText.toLowerCase())
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchedText(event.target.value);
  };

  return (
    <div className="searchable-list">
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search"
        onChange={handleChange}
      />
      <ul>
        {searchResults.map((item, index) => (
          <li key={itemKeyfn(item)}>{children(item)}</li>
        ))}
      </ul>
    </div>
  );
}
