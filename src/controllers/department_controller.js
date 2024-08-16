import validator from "fastest-validator";
const v = new validator();
import { db } from "../db/db.js";

export const save = async (req, res) => {
  try {
    const { name, description } = req.body;

    const schema = {
      name: { type: "string", optional: false, max: 100 },
      description: { type: "string", optional: false, max: 1000 },
    };

    const validationResult = v.validate({ name, description }, schema);
    if (validationResult !== true) {
      return res
        .status(400)
        .json({ message: "Validation failed", error: validationResult });
    }
    const existingDepartment = await db.department.findUnique({
      where: { name: name },
    });
    if (existingDepartment) {
      return res
        .status(409)
        .json({ success: false, message: "Department already exists" });
    }
    const newDepart = await db.department.create({
      data: {
        name: name,
        description: description,
      },
    });

    res
      .status(201)
      .json({ success: true, message: "Department created successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};


// Get all department
export const allData = async (req, res) => {
    try {
      const departs = await db.department.findMany();
      res.status(200).json({ success: true, data: departs });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Something went wrong" });
    }
  };

  // Get department by ID
export const show = async (req, res) => {
    const id = req.params.id;
    try {
      const depart = await db.department.findUnique({ where: { id: Number(id) } });
      if (depart) {
        res.status(200).json(depart);
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Something went wrong" });
    }
  };

  // Delete department
export const drop = async (req, res) => {
    const id = req.params.id;
    try {
      await db.department.delete({ where: { id: Number(id) } });
      res
        .status(200)
        .json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Something went wrong" });
    }
  };

  export const updateData = async (req, res) => {
    const id = req.params.id;
    const { name, description } = req.body;
  
    const schema = {
        name: { type: "string", optional: false, max: 100 },
        description: { type: "string", optional: false, max: 1000 },
      };  
    const validationResult = v.validate(
      { name,description },
      schema
    );
    if (validationResult !== true) {
      return res
        .status(400)
        .json({ message: "Validation failed", error: validationResult });
    }
    try {  
      await db.department.update({
        where: { id: Number(id) },
        data: {
          name: name,
          description:description
        },
      });
      res
        .status(200)
        .json({ success: true, message: "department updated successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Something went wrong" });
    }
  };
