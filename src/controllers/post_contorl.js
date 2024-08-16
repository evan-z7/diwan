import validator from "fastest-validator";
import { v2 as cloudinary } from "cloudinary";
import { uploadImage } from "../cloudinary/cloudinary.js";
const v = new validator();
import { db } from "../db/db.js";

// Add new post
export const save = async (req, res) => {
  try {
    const imageName = new Date().getTime().toString();
    const Photo = await uploadImage(req.file.buffer, imageName);

    const postdata = {
      description: req.body.description,
      image: Photo.url,
      date: req.body.date,
    };

    const schema = {
      description: { type: "string", optional: false, max: 500 },
      image: { type: "string", optional: false },
      date: { type: "string", optional: false },
    };

    const validationResult = v.validate(postdata, schema);
    if (validationResult !== true) {
      return res
        .status(400)
        .json({ message: "Validation failed", error: validationResult });
    }
    const userdep = await db.user.findUnique({
      where: { id: Number(req.body.receiver) },
    });
    if (!userdep) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    const posdata = await db.post.create({
      data: {
        description: postdata.description,
        image: postdata.image,
        date: postdata.date,
        depart: userdep.depart,
      },
    });
    if (posdata && userdep) {
      await db.relation.create({
        data: {
          senderId: Number(req.body.sender),
          recieverId: Number(req.body.receiver),
          postId: Number(posdata.id),
          states: "قيد الانتظار",
          depart: userdep.depart,
        },
      });
    }

    res
      .status(201)
      .json({ success: true, message: "Post created successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

//change states
export const changeStates = async (req, res) => {
  const cond = req.params.num;
  try {
    const state = await db.relation.findMany({
      where: { postId: req.body.id, recieverId: req.body.reciever },
    });
    if (state) {
      if (cond == 1) {
        await db.relation.updateMany({
          where: { postId: req.body.id, recieverId: req.body.reciever },
          data: {
            states: "منجزة",
          },
        });
      } else if (cond == 0) {
        await db.relation.updateMany({
          where: { postId: req.body.id, recieverId: req.body.reciever },
          data: {
            states: "مرفوضة",
          },
        });
      } else {
        res
          .status(500)
          .json({ success: false, message: "Something went wrong" });
      }
      res.status(200).json({ success: true, data: "done" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error });
    console.log(error);
  }
};

// Get post by ID
export const show = async (req, res) => {
  const id = req.params.id;
  try {
    console.log(id);

    const postat = await db.post.findUnique({ where: { id: Number(id) } });
    console.log(postat);
    if (postat) {
      const state = await db.relation.findMany({
        where: { postId: Number(id), recieverId: req.body.receiver },
      });
      console.log(state);

      if (state) {
        await db.relation.updateMany({
          where: { postId: Number(id), recieverId: req.body.receiver },
          data: { states: "قيد المعالجة" },
        });
        res.status(200).json({ success: true, data: postat });
      } else {
        res
          .status(410)
          .json({ success: false, message: "couldn't fined the relationship" });
      }
    } else {
      res.status(404).json({ success: false, message: "Post not found" });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, message: error });
  }
};
// Get posts by reciever
export const destdata = async (req, res) => {
  try {
    const id = req.params.id;
    const posts = await db.relation.findMany({
      where: { recieverId: Number(id) },
      select: {
        states: true,
        post: true,
      },
    });
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// Get all posts
export const allData = async (req, res) => {
  try {
    const posts = await db.relation.findMany({
      select: { states: true, post: true },
    });
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
// Update post data
export const updateData = async (req, res) => {
  try {
    if (req.file) {
      const imageName = new Date().getTime().toString();
      const Photo = await uploadImage(req.file.buffer, imageName);
      var url = Photo.url;
    }
    const id = req.params.id;
    const { description, date } = req.body;

    const schema = {
      description: { type: "string", optional: true, max: 500 },
      url: { type: "string", optional: true },
      date: { type: "string", optional: true },
    };

    const validationResult = v.validate({ description, url, date }, schema);
    if (validationResult !== true) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: validationResult,
      });
    }

    await db.post.update({
      where: { id: Number(id) },
      data: {
        description: description,
        image: url,
        date: date,
      },
    });
    res
      .status(200)
      .json({ success: true, message: "Post edited successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// Delete post
export const drop = async (req, res) => {
  const id = req.params.id;
  try {
    await db.post.delete({ where: { id: Number(id) } });
    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// Get all users' names
export const usersNames = async (req, res) => {
  try {
    const users = await db.user.findMany({
      select: {
        name: true,
        id: true,
      },
    });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
//get by department
export const departData = async (req, res) => {
  const Id = req.params.id
  try {
    const posts = await db.relation.findMany({
      where: { depart: Number(Id) },
      select: { states: true, post: true },
    });
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
