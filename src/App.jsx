import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CategorySchedule from "./pages/CategorySchedule";
import ItemDetail from "./pages/ItemDetail";
import UploadManagement from "./pages/UploadManagement";
import FAQ from "./pages/FAQ";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<CategorySchedule />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/upload" element={<UploadManagement />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;