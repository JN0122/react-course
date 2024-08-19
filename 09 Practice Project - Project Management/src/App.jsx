import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/Sidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setProjectState((prev) => {
      const newTask = {
        id: crypto.randomUUID(),
        projectId: prev.selectedProjectId,
        text: text,
      };
      return {
        ...prev,
        tasks: [...prev.tasks, newTask],
      };
    });
  }

  function handleDeleteTask(taskId) {
    setProjectState((prev) => {
      return {
        ...prev,
        tasks: prev.tasks.filter((task) => task.id != taskId),
      };
    });
  }

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

  function handleProjectDelete(projectId) {
    setProjectState((prev) => {
      return {
        ...prev,
        selectedProjectId: undefined,
        projects: prev.projects.filter((project) => project.id != projectId),
      };
    });
  }
  const tasks = projectsState.tasks.filter(
    (task) => task.projectId === projectsState.selectedProjectId
  );
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
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
          project={projectsState.projects.find(
            (project) => project.id === projectsState.selectedProjectId
          )}
          onProjectDelete={handleProjectDelete}
          tasks={tasks}
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
