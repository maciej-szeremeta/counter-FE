import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, } from 'react-router-dom';
import { Provider, } from 'react-redux';
import { QueryClient, QueryClientProvider, } from 'react-query';
import reportWebVitals from './reportWebVitals';
import { store, } from './store';
import { App, } from './App';
import './index.css';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </Provider>
</React.StrictMode>);

reportWebVitals();
