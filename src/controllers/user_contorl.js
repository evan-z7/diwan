import validator from "fastest-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db/db.js";
const v = new validator();

// Add new user
export const save = async (req, res) => {
  try {
    const { name, email, password, position, number, depart } = req.body;

    const schema = {
      name: { type: "string", optional: false, max: 100 },
      email: { type: "email", optional: false, max: 100 },
      password: { type: "string", optional: false, min: 8 },
      number: { type: "number", optional: true, length: 10 },
      position: { type: "string", optional: false, max: 100 },
      depart: { type: "number", optional: false, length: 10 },
    };

    const validationResult = v.validate(
      { name, email, password, position, number, depart },
      schema
    );
    if (validationResult !== true) {
      return res
        .status(400)
        .json({ message: "Validation failed", error: validationResult });
    }

    const existingUser = await db.user.findUnique({ where: { email: email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        position: position,
        number: number,
        sex : sex,
        depart: depart,
      },
    });

    res
      .status(201)
      .json({ success: true, message: "User created successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// Get user by ID
export const show = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await db.user.findUnique({ where: { id: Number(id) } });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// Get all users
export const allData = async (req, res) => {
  try {
    const users = await db.user.findMany();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// Update user data
export const updateData = async (req, res) => {
  const id = req.params.id;
  const { name, email, password, position, number, depart } = req.body;

  const schema = {
    name: { type: "string", optional: true, max: 100 },
    email: { type: "email", optional: true, max: 100 },
    password: { type: "string", optional: true, min: 8 },
    number: { type: "number", optional: true, length: 10 },
    position: { type: "string", optional: true, max: 100 },
    depart: { type: "number", optional: true, length: 10 },
  };
  console.log(position);

  const validationResult = v.validate(
    { name, email, password, position, number, depart },
    schema
  );
  if (validationResult !== true) {
    return res
      .status(400)
      .json({ message: "Validation failed", error: validationResult });
  }
  console.log(position);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(number);

    await db.user.update({
      where: { id: Number(id) },
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        position: position,
        number: number,
        depart: depart,
      },
    });
    res
      .status(200)
      .json({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// Delete user
export const drop = async (req, res) => {
  const id = req.params.id;
  try {
    await db.user.delete({ where: { id: Number(id) } });
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// User login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.user.findUnique({ where: { email: email } });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Email not found" });
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign(
        {
          email: user.email,
          userId: user.id,
        },
        "secret",
        { expiresIn: "1h" }
      );
      await db.user.update({
        where: { email: email },
        data: {
          token: token,
        },
      });
      return res.status(200).json({
        success: true,
        message: "Authentication successful",
        token: token,
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Authentication failed" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
