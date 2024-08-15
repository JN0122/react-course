import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/Sidebar";

function App() {
  const [projectsState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  function handleStartAddProject() {
    setProjectState((prev) => {
      return { ...prev, selectedProjectId: null };
    });
  }

  function handleAddProject(newProject) {
    const project = { ...newProject, id: crypto.randomUUID() };

    setProjectState((prev) => {
      return {
        ...prev,
        selectedProjectId: undefined,
        projects: [...prev.projects, project],
      };
    });
  }

  let content;
  switch (projectsState.selectedProjectId) {
    case null:
      content = <NewProject onAddProject={handleAddProject} />;
      break;
    case undefined:
      content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
      break;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
      />
      {content}
    </main>
  );
}

export default App;
