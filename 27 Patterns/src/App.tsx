import Accordion from "./components/compound-components/Accordion/Accordion";
import SearchableList from "./components/render-props/SearchableList/SearchableList";
import { Place as PlaceType } from "../types/places";
import Place from "./components/render-props/Place";

import savannaImg from "./assets/african-savanna.jpg";
import amazonImg from "./assets/amazon-river.jpg";
import caribbeanImg from "./assets/caribbean-beach.jpg";
import desertImg from "./assets/desert-dunes.jpg";
import forestImg from "./assets/forest-waterfall.jpg";

const PLACES: PlaceType[] = [
  {
    id: "african-savanna",
    image: savannaImg,
    title: "African Savanna",
    description: "Experience the beauty of nature.",
  },
  {
    id: "amazon-river",
    image: amazonImg,
    title: "Amazon River",
    description: "Get to know the largest river in the world.",
  },
  {
    id: "caribbean-beach",
    image: caribbeanImg,
    title: "Caribbean Beach",
    description: "Enjoy the sun and the beach.",
  },
  {
    id: "desert-dunes",
    image: desertImg,
    title: "Desert Dunes",
    description: "Discover the desert life.",
  },
  {
    id: "forest-waterfall",
    image: forestImg,
    title: "Forest Waterfall",
    description: "Listen to the sound of the water.",
  },
];

export default function App() {
  return (
    <>
      <h1>React Patterns & Practices</h1>
      <section>
        <Accordion className="accordion">
          <Accordion.Item
            title="What is React?"
            className="accordion-item"
            id="what-is-react"
          >
            React is a JavaScript library for building user interfaces. It is
            maintained by Facebook and a community of individual developers and
            companies.
          </Accordion.Item>
          <Accordion.Item
            title="Why use React?"
            className="accordion-item"
            id="why-use-react"
          >
            React allows developers to create large web applications that can
            update and render efficiently in response to data changes. Its
            component-based architecture promotes reusability and
            maintainability.
          </Accordion.Item>
          <Accordion.Item
            title="How do you use React?"
            className="accordion-item"
            id="how-do-you-use-react"
          >
            React can be used by creating components, which are reusable pieces
            of UI. These components can manage their own state and can be
            composed to build complex user interfaces.
          </Accordion.Item>
        </Accordion>
      </section>
      <section>
        <SearchableList items={PLACES} itemKeyfn={(item) => item.id}>
          {(item) => <Place item={item} />}
        </SearchableList>
        <SearchableList items={["item 1", "item 2"]} itemKeyfn={(item) => item}>
          {(item) => item}
        </SearchableList>
      </section>
    </>
  );
}

