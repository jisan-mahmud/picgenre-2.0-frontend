import './App.css'
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { QueryProvider } from './components/QueryProvider';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Workspace from './pages/Workspace';
import Login from './pages/Login';
import MainLayouts from './components/layouts/MainLayouts';
import General from './pages/settings/General';
import SettingsLayout from './components/layouts/SettingsLayout';
import AIModels from './pages/settings/AIModels';
import History from './pages/settings/History';
import BillingPlan from './pages/settings/BillingPlan';
import Pricing from './pages/Pricing';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Shop from './pages/Shop';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayouts />}>
            <Route index element={<Home />} />
            <Route path="/workspace" element={
              <ProtectedRoute>
                <Workspace />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <SettingsLayout />
              </ProtectedRoute>
            } >
              <Route path="/settings" index element={<General />} />
              <Route path="/settings/ai-models" element={<AIModels />} />
              <Route path="/settings/history" element={<History />} />
              <Route path="/settings/billing-plan" element={<BillingPlan />} />
            </Route>
            <Route path="/pricing" element={<Pricing />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/shop' element={<Shop />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;
