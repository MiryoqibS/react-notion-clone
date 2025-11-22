import { Routes, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";

import { SettingsPage } from "./pages/SettingsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { EditNotePage } from "./pages/EditNotePage";
import { ViewNotePage } from "./pages/ViewNotePage";

import { UserProvider } from "./providers/userProvider";
import { NotesProvider } from "./providers/NotesProvider";


export const App = () => {
  return (
    <UserProvider>
      <NotesProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/editNote/:id" element={<EditNotePage />} />
            <Route path="/viewNote/:id" element={<ViewNotePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </NotesProvider>
    </UserProvider>
  );
}
