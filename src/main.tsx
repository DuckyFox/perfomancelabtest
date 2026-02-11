import { createRoot } from 'react-dom/client'
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import './app/styles/index.css'
import App from './app/App.tsx'
import {store} from "./app/store";
import {Provider} from "react-redux";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000
        }
    }
})

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <App />
        </Provider>,
    </QueryClientProvider>
)
