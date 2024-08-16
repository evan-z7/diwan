import express from "express";

import {
  save,
  show,
  allData,
  updateData,
  drop,
} from "../controllers/department_controller.js";

const router = new express.Router();

router.post("/", save);
router.get("/:id", show);
router.get("/", allData);
router.patch("/:id", updateData);
router.delete("/:id", drop);

export default router;
