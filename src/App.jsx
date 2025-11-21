import { Routes, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { SettingsPage } from "./pages/SettingsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { UserProvider } from "./providers/userProvider";
import { EditNotePage } from "./pages/EditNotePage";
import { PagesProvider } from "./providers/PagesProvider";

export const App = () => {
  return (
    <UserProvider>
      <PagesProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/editPage/:id" element={<EditNotePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </PagesProvider>
    </UserProvider>
  );
}
