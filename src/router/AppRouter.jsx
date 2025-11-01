import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/Home";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/about",
          element: <About />
        },
        {
          path: "/skills",
          element: <Skills />
        },
        {
          path: "/projects",
          element: <Projects />
        },
        {
          path: "/contact",
          element: <Contact />
        }
      ]
    }
  ]);

  export default appRouter;