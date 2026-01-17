import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/Home";
import { getItemFromLocalStorage } from "../utils/helper";
import { ChatPageUrl, HomePageUrl, TaskPageUrl } from "../constant";
import ChatLayout from "../pages/Chat";
import Tasks from "../pages/Task";


const routeList = [
  {
    path: HomePageUrl,
    element: <Tasks />,
    exact: true,
    protected: false,
  },
  {
    path: ChatPageUrl,
    element: <ChatLayout />,
    protected: true,
  },
  {
    path: TaskPageUrl,
    element: <Tasks />,
    protected: true,
  },

];

export const AppRoutes = ({ handleAuthPopup }) => {
  const token = getItemFromLocalStorage("token", "");

  return (
    <Routes>
      {routeList.map(({ path, element, protected: isProtected }, index) => {
        if (isProtected && !token) {
          return (
            <Route
              key={index}
              path={path}
              element={
                <AuthRedirect handleAuthPopup={handleAuthPopup} />
              }
            />
          );
        }

        return <Route key={index} path={path} element={element} />;
      })}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

// helper component to trigger popup and redirect
const AuthRedirect = ({ handleAuthPopup }) => {
  React.useEffect(() => {
    handleAuthPopup(); // runs once, after first mount
  }, [handleAuthPopup]);

  return <Navigate to="/" replace />;
};
