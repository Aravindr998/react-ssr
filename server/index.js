import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import "isomorphic-fetch";
import App from "../src/App";
import { StaticRouter } from "react-router-dom/server";
import routes from "../src/router";
import { matchPath } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "../src/store/store";

const app = express();

app.use(express.static("public"));

app.get("*", (req, res) => {
  const store = configureStore();

  const promises = routes.reduce((acc, route) => {
    if (
      matchPath(route, req.url) &&
      route.component &&
      route.component.initialAction
    ) {
      console.log("here");
      acc.push(
        Promise.resolve(store.dispatch(route.component.initialAction(req.url)))
      );
    }
    return acc;
  }, []);

  const currentRoute = routes.find((route) => matchPath(route, req.url));
  
  
  Promise.all(promises)
  .then(() => {
    const markup = renderToString(
      <Provider store={store}>
          <StaticRouter location={req.url}>
            <App />
          </StaticRouter>
        </Provider>
      );
      let initialData = store.getState();
      let title
      let metaTags
      if (currentRoute.path === "/products/:id") {
        let data  = initialData.details?.details;
        console.log(data, '---> data')
        title = data.title;
        metaTags = `<meta property="og:title" content="${data.title}" />
            <meta property="og:description" content="${data.description}" />
            <meta property="og:image" content="${data.thumbnail}" />`;
      }

      res.send(`
        <!DOCTYPE html>
            <head>
              <title>${title}</title>
              ${metaTags ? metaTags : ''}
              <link rel="stylesheet" href="/css/main.css">
              <script src="/bundle.js" defer></script>
              <script>window.__initialData__=${JSON.stringify(
                initialData
              )}</script>
            </head>
      
            <body>
              <div id="root">${markup}</div>
            </body>
          </html>
          `);
      console.log(initialData);
    })
    .catch((error) => console.log(error));

  // let title = "React";
  // let metaTags;
  // if (currentRoute.path === "/products/:id") {
  //   title = initialData.title;
  //   metaTags = `<meta property="og:title" content="${initialData.title}" />
  //     <meta property="og:description" content="${initialData.description}" />
  //     <meta property="og:image" content="${initialData.thumbnail}" />`;
  // }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running");
});
