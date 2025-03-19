import {Route, Routes} from "react-router-dom";

import {MainLayout} from "@/layouts/MainLayout";
import {HomePage} from "@/pages/Home";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
