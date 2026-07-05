import { Hono } from "hono";
import { CategoryController } from "@modules/categories/category.controller";

const categoryRoutes = new Hono();
const internalRoutes = new Hono();
const externalRoutes = new Hono();

// Internal routes
internalRoutes.post("/categories", CategoryController.createCategory);
internalRoutes.get("/categories", CategoryController.queryCategories);
internalRoutes.get("/categories/:id", CategoryController.getCategory);
internalRoutes.put("/categories/:id", CategoryController.updateCategory);
internalRoutes.delete("/categories/:id", CategoryController.deleteCategory);

// External routes
externalRoutes.get("/categories", CategoryController.listCategories);

// Register routess
categoryRoutes.route("/internal", internalRoutes);
categoryRoutes.route("", externalRoutes);
export default categoryRoutes;
