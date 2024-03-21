import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import AgentTranHistory from "../pages/AgentTranHistory/AgentTranHistory";
import U2ACashOutHistory from "../pages/U2ACashOutHistory/U2ACashOutHistory";
import A2UBalanceTransfer from "../pages/A2UBalanceTransfer/A2UBalanceTransfer";



const router = createBrowserRouter([
    {
      path: "/",
      element: <Login></Login>,
    },
    {
      path: "/home",
      element: <Home></Home>,
    },
    {
      path: "/agentTranHistory",
      element: <AgentTranHistory></AgentTranHistory>,
    },
    {
      path: "/u2aCashOutHistory",
      element: <U2ACashOutHistory></U2ACashOutHistory>,
    },
    {
      path: "/a2uBalanceTransfer",
      element: <A2UBalanceTransfer></A2UBalanceTransfer>,
    },
    
  ]);

  export default router