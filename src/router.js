import React from "react"
import ProductListPage from "./pages/ProductListPage"
import ProductDetailsPage from "./pages/ProductDetailsPage"

const routes = [
    {
        path: '/',
        element: <ProductListPage/>,
        component: ProductListPage
    },
    {
        path: '/products/:id',
        element: <ProductDetailsPage/>,
        component: ProductDetailsPage
    }
]

export default routes