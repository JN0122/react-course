import Accordion from "./components/compound-components/Accordion/Accordion";

function App() {
  return (
    <>
      <h1>React Patterns & Practices</h1>
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
          component-based architecture promotes reusability and maintainability.
        </Accordion.Item>
        <Accordion.Item
          title="How do you use React?"
          className="accordion-item"
          id="how-do-you-use-react"
        >
          React can be used by creating components, which are reusable pieces of
          UI. These components can manage their own state and can be composed to
          build complex user interfaces.
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default App;
