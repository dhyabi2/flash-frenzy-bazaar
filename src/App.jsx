import React, { useState, useEffect } from 'react';
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
import Bookmarks from "./pages/Bookmarks";
import AdminPage from "./pages/AdminPage";
import Loader from "./components/Loader";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (you can remove this in production)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
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
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;