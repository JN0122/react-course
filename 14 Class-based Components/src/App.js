import UserFinder from "./components/UserFinder";
import {UserProvider} from "./context/users-context";

function App() {
  return (
    <div>
        <UserProvider>
            <UserFinder />
        </UserProvider>
    </div>
  );
}

export default App;
