import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "@/helpers/router";
import { HelmetProvider } from "react-helmet-async";
import { TransitionGroup, CSSTransition } from "react-transition-group";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <TransitionGroup>
        <CSSTransition key={location.pathname} 
        timeout={5000}
        className="page-transition">
          <RouterProvider router={router} />
        </CSSTransition>
      </TransitionGroup>
    </HelmetProvider>
  </React.StrictMode>
);
