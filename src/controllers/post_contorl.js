import validator from 'fastest-validator';
import models from '../../models/index.js';
import { v2 as cloudinary } from 'cloudinary';
import { uploadImage } from '../cloudinary/cloudinary.js';

const v = new validator();

// Add new post
export const save = async (req, res) => {
  try {
    const imageName = new Date().getTime().toString();
    const Photo = await uploadImage(req.file.buffer, imageName);

    const post = {
      description: req.body.description,
      image: Photo.url,
      receiver: Number(req.body.receiver),
      sender: Number(req.body.sender),
      date: req.body.date
    };

    const schema = {
      description: { type: "string", optional: false, max: 500 },
      image: { type: "string", optional: false },
      receiver: { type: "number", optional: false },
      sender: { type: "number", optional: false },
      date: { type: "string", optional: false }
    };

    const validationResult = v.validate(post, schema);
    if (validationResult !== true) {
      return res.status(400).json({ message: "Validation failed", error: validationResult });
    }

    await models.post.create(post);
    res.status(201).json({ success: true, message: "Post created successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// Get post by ID
export const show = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await models.post.findByPk(id);
    if (post) {
      res.status(200).json({ success: true, data: post });
    } else {
      res.status(404).json({ success: false, message: "Post not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// Get posts by receiver
export const destdata = async (req, res) => {
  try {
    const receiver = req.body.receiver;

    if (!receiver) {
      return res.status(400).json({ success: false, message: 'Missing receiver parameter' });
    }

    const posts = await models.post.findAll({ where: { receiver: receiver } });
    if (posts.length > 0) {
      res.status(200).json({ success: true, data: posts });
    } else {
      res.status(404).json({ success: false, message: 'No data found for the provided receiver' });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get all posts
export const allData = async (req, res) => {
  try {
    const posts = await models.post.findAll();
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// Update post data
export const updateData = async (req, res) => {
  try {
    const imageName = new Date().getTime().toString();
    const Photo = await uploadImage(req.file.buffer, imageName);

    const id = req.params.id;
    const updatedPost = {
      description: req.body.description,
      image: Photo.url,
      date: req.body.date
    };

    const schema = {
      description: { type: "string", optional: false, max: 500 },
      image: { type: "string", optional: true },
      date: { type: "string", optional: false }
    };

    const validationResult = v.validate(updatedPost, schema);
    if (validationResult !== true) {
      return res.status(400).json({ success: false, message: "Validation failed", error: validationResult });
    }

    await models.post.update(updatedPost, { where: { id: id } });
    res.status(200).json({ success: true, message: "Post edited successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// Delete post
export const drop = async (req, res) => {
  const id = req.params.id;
  try {
    await models.post.destroy({ where: { id: id } });
    res.status(200).json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// Get all users' names
export const usersNames = async (req, res) => {
  try {
    const users = await models.user.findAll({ attributes: ['id', 'name'] });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};