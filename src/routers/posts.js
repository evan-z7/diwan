import express from "express";
import {
  save,
  allData,
  show,
  changeStates,
  usersNames,
  drop,
  updateData,
  destdata,
  departData,
} from "../controllers/post_contorl.js";
import { upload } from "../utils/multerToHandelUpload.js";

const router = express.Router();

router.post("/", upload.single("image"), save);
router.post("/:id", show);
router.get("/", allData);
router.patch("/:id", upload.single("image"), updateData);
router.delete("/:id", drop);
router.get("/destination/:id", destdata);
router.get("/users/names", usersNames);
router.post("/:num", changeStates);
router.get("/department/:id", departData);

export default router;
