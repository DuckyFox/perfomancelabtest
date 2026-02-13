import { createRoot } from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./app/styles/index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { router } from "@/app/router/router.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000,
        },
    },
});

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </QueryClientProvider>
);
