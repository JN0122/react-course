import { Place as PlaceType } from "../../../types/places";

type Props = {
  item: PlaceType;
};

export default function Place({ item }: Props) {
  return (
    <article className="place">
      <img src={item.image} alt={item.title} />
      <div>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
      </div>
    </article>
  );
}
