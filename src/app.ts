import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import swagger from "express-swagger-generator";
import "reflect-metadata";
import CategoryController from "./controllers/category.controller";
import {ErrorHandler} from "./middlewares/error-middleware";

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Controllers
app.use("/category", CategoryController);

app.use((error: ErrorHandler, req, res, next) => {
    error.handleError(res);
});

app.listen(port, () => {
    console.log(`app listening on port ${port}!`);
});
