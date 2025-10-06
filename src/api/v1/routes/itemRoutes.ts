import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { itemSchemas } from "../validations/itemValidation";
import * as itemController from "../controllers/itemController";
import authenticate from "../middleware/authenticate";

const router: Router = express.Router();

// "/api/v1/items" prefixes all below routes
router.get("/", itemController.getAllItems);
router.post(
    "/",
    authenticate,
    validateRequest(itemSchemas.create),
    itemController.createItem
);
router.put(
    "/:id",
    validateRequest(itemSchemas.update),
    itemController.updateItem
);
router.delete("/:id", itemController.deleteItem);

export default router;
