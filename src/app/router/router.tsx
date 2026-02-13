import { createBrowserRouter } from "react-router";
import { Products } from "@/pages/Products";
import App from "@/app/App.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Products />,
            },
        ],
    },
]);
