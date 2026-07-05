import { Hono } from "hono";
import categoryRoutes from "@/modules/categories/category.routes";

const router = new Hono();

router.route("", categoryRoutes);

export default router;
