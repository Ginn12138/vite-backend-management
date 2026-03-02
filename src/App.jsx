import { RouterProvider } from "react-router";
import router from "./router/router";
import { Provider } from "react-redux";
import store from "./store";
import "./api/mock";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </div>
  );
}

export default App;
