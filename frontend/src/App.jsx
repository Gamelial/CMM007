import { Routes, Route } from "react-router-dom";
import {
  Stories,
  Story,
  WriteStory,
  AdminStories,
  AdminStory,
  AdminReaderList,
  AdminWriterList,
} from "./components";
import { Login, Signup, WriterDashboard, AdminDashboard, Home } from "./pages";
import { ReaderLayout, WriterLayout, AdminLayout } from "./layouts";

function App() {
  return (
    <main>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Signup />} />
        <Route element={<ReaderLayout />}>
          <Route path={"/reader"} element={<Stories />} />
          <Route path={"/reader/:id"} element={<Story />} />
        </Route>
        <Route element={<WriterLayout />}>
          <Route path={"/writer"} element={<WriterDashboard />} />
          <Route path={"/writer/stories"} element={<Stories />} />
          {/* <Route path={"/writer/stories/:id"} element={<Stories />} /> */}
          <Route path={"/writer/stories/add"} element={<WriteStory />} />
          <Route path={"/writer/stories/:id/edit"} element={<Story />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path={"/admin"} element={<AdminDashboard />} />
          <Route path={"/admin/stories"} element={<AdminStories />} />
          <Route path={"/admin/stories/:id"} element={<AdminStory />} />
          <Route path={"/admin/readers"} element={<AdminReaderList />} />
          <Route path={"/admin/readers/:id"} element={<AdminDashboard />} />
          <Route path={"/admin/writers"} element={<AdminWriterList />} />
          <Route path={"/admin/writers/:id"} element={<AdminWriterList />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
