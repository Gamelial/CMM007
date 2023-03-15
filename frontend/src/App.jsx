import { Routes, Route } from "react-router-dom";
import {
  Stories,
  Story,
  WriteStory,
  WriterStories,
  WriterStory,
  AdminStories,
  AdminStory,
  AdminWriterList,
  AdminWriterDetails,
  EditStory,
} from "./components";
import { RequireAuth } from "react-auth-kit";
import { Login, Signup, WriterDashboard, AdminDashboard, Home } from "./pages";
import { SeekerLayout, StoryTellerLayout, AdminLayout } from "./layouts";

function App() {
  return (
    <main>
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Signup />} />

        <Route element={<SeekerLayout />}>
          <Route path={"/"} element={<Stories />} />
          <Route path={"/:id"} element={<Story />} />
        </Route>

        <Route element={<StoryTellerLayout />}>
          <Route path={"/writer"} element={<ProtectedWriter />} />
          <Route path={"/writer/stories"} element={<WriterStories />} />
          <Route path={"/writer/stories/:id"} element={<WriterStory />} />
          <Route
            path={"/writer/stories/add"}
            element={<ProtectedWriteStory />}
          />
          <Route
            path={"/writer/stories/edit/:id"}
            element={<ProtectedEditStory />}
          />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path={"/admin"} element={<AdminDashboard />} />
          <Route path={"/admin/stories"} element={<AdminStories />} />
          <Route path={"/admin/stories/:id"} element={<AdminStory />} />
          <Route path={"/admin/writers"} element={<AdminWriterList />} />
          <Route path={"/admin/writers/:id"} element={<AdminWriterDetails />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;

const ProtectedWriter = () => {
  return (
    <RequireAuth loginPath={"/login"}>
      <WriterDashboard />
    </RequireAuth>
  );
};
const ProtectedWriteStory = () => {
  return (
    <RequireAuth loginPath={"/login"}>
      <WriteStory />
    </RequireAuth>
  );
};
const ProtectedEditStory = () => {
  return (
    <RequireAuth loginPath={"/login"}>
      <EditStory />
    </RequireAuth>
  );
};
