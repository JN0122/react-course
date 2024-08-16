import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/Sidebar";
import SelectedProject from "./components/SelectedProject";

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

  function handleCancelAddProject() {
    setProjectState((prev) => {
      return {
        ...prev,
        selectedProjectId: undefined,
      };
    });
  }

  function handleProjectSelect(projectId) {
    setProjectState((prev) => {
      return {
        ...prev,
        selectedProjectId: projectId,
      };
    });
  }

  let content;
  switch (projectsState.selectedProjectId) {
    case null:
      content = (
        <NewProject
          onAddProject={handleAddProject}
          onCancel={handleCancelAddProject}
        />
      );
      break;
    case undefined:
      content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
      break;
    default:
      content = (
        <SelectedProject
          project={projectsState.projects.find(
            (project) => project.id === projectsState.selectedProjectId
          )}
        />
      );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        selectedProjectId={projectsState.selectedProjectId}
        onProjectSelect={handleProjectSelect}
      />
      {content}
    </main>
  );
}

export default App;
