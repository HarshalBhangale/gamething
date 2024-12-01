import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Switch, Route } from "wouter";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Game from "./pages/Game";
import { RecoilRoot } from 'recoil';

function Router() {
  return (
    <Switch>
      <Route path="/" component={Game} />
      <Route>404 Page Not Found</Route>
    </Switch>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Router />
        <Toaster />
      </RecoilRoot>
    </QueryClientProvider>
  </StrictMode>,
);
