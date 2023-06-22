import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import "isomorphic-fetch";
import App from "../src/App";
import { StaticRouter } from "react-router-dom/server";
import { ServerContext } from "../src/store/ServerContext";
import routes from "../src/router";
import { matchPath } from "react-router-dom";

const app = express();

app.use(express.static("public"));

app.get("*", (req, res) => {
  const currentRoute = routes.find((route) => matchPath(route, req.url));
  const requestInitialData =
    currentRoute.component.requestInitialData &&
    currentRoute.component.requestInitialData(req.url);
  Promise.resolve(requestInitialData).then((initialData) => {
    const context = { initialData };
    const markup = renderToString(
      <StaticRouter location={req.url}>
        <ServerContext.Provider value={JSON.stringify(context)}>
          <App value={JSON.stringify(context)} />
        </ServerContext.Provider>
      </StaticRouter>
    );
    let title = "React";
    let metaTags;
    if (currentRoute.path === "/products/:id") {
      title = initialData.title;
      metaTags = `<meta property="og:title" content="${initialData.title}" />
        <meta property="og:description" content="${initialData.description}" />
        <meta property="og:image" content="${initialData.thumbnail}" />`;
    }
    res.send(`
        <!DOCTYPE html>
            <head>
              <title>${title}</title>
              ${metaTags ? metaTags : ""}
              <link rel="stylesheet" href="/css/main.css">
              <script src="/bundle.js" defer></script>
              <script>window.__initialData__=${JSON.stringify(
                initialData.products
              )}</script>
            </head>
      
            <body>
              <div id="root">${markup}</div>
            </body>
          </html>
          `);
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});
