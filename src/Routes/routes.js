import React from "react";
import { PageRoutes } from "./config";
import { Navigate, Route, Routes } from "react-router";
import PageNotFound from "../pages/PageNotFound/pageNotFound";
import AccessDenied from "../pages/AccessDenied/denied";
import Routeguard from "./Routegurad";

const Router = () => {
  const PageData = PageRoutes.map(
    ({ path, element, AccessKey, Type, Name }) => {
      const hasReadPermission = Routeguard(Name, "CanRead");
      if (AccessKey === "login") {
        return <Route key={AccessKey} path={`/${path}`} element={element} />;
      } else {
        if (hasReadPermission) {
          return <Route path={path} key={AccessKey} element={element} />;
        } else {
          // Redirect to access denied if permission is not granted
          return <Route path={path} key={AccessKey} element={element} />;
        }
      }
    }
  );

  // Add the "Forbidden" and "404" pages to the router
  PageData.push(
    <Route key="forbidden" path="/forbidden" element={<AccessDenied />} />,
    <Route key="notfound" path="*" element={<PageNotFound />} />
  );

  return <Routes>{PageData}</Routes>;
};

export default Router;
