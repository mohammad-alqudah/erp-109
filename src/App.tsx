import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppLayout from './components/layout/AppLayout';
import LoginForm from './components/LoginForm';
import ProductsTable from './components/ProductsTable';
import CustomersTable from './components/customers/CustomersTable';
import ActionsTable from './components/messaging/ActionsTable';
import UsersTable from './components/users/UsersTable';
import SettingsPage from './components/settings/SettingsPage';
import Layout from './components/Layout';

const queryClient = new QueryClient();

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = !!localStorage.getItem('accessToken');
  return isAuthenticated ? <Layout>{children}</Layout> : <Navigate to="/login" />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <ProductsTable />
                </PrivateRoute>
              }
            />
            <Route
              path="/customers"
              element={
                <PrivateRoute>
                  <CustomersTable />
                </PrivateRoute>
              }
            />
            <Route
              path="/messaging"
              element={
                <PrivateRoute>
                  <ActionsTable />
                </PrivateRoute>
              }
            />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <UsersTable />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <SettingsPage />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/settings" />} />
          </Routes>
        </BrowserRouter>
      </AppLayout>
    </QueryClientProvider>
  );
}

export default App;