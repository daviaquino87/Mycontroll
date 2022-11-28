import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { routes } from "./routes/index.routes";
import { AppdataSource } from "./database/data-source";
import { errorValidator } from "./middleware/error-validator";

AppdataSource.initialize()
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use(routes);

    app.use(errorValidator);
    app.listen(process.env.PORT || 3000, () =>
      console.log("server is running!")
    );
  })
  .catch((e) => {
    console.log(e);
  });
