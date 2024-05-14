/* eslint-disable linebreak-style */
/* eslint-disable camelcase */

const Component = require("../models/component");
const OperationCount = require("../models/operationCount");
const responseUtil = require("../utils/component");

exports.addComponent = async (req, res) => {
  const {component_number, content} = req.body;

  try {
    // Find existing component with the same number
    const existingComponent = await Component.findOne(
        {component_number, is_active: true});

    if (existingComponent) {
      // Update existing component to mark as inactive
      await Component.updateMany(
          {component_number: component_number, is_active: true},
          {is_active: false});
      await Component.create({component_number, content});
      await OperationCount.findOneAndUpdate(
          {operation_type: "add", component_number},
          {$inc: {count: 1}},
          {upsert: true},
      );
      responseUtil.success(res, 201, "Component content added successfully");
    } else {
      // Create new component
      await Component.create({component_number, content});
      await OperationCount.findOneAndUpdate(
          {operation_type: "add", component_number},
          {$inc: {count: 1}},
          {upsert: true},
      );
      responseUtil.success(res, 201, "Component added successfully");
    }
  } catch (err) {
    console.error(err);
    responseUtil.error(res, 500, "Internal server error");
  }
};


exports.updateComponent = async (req, res) => {
  const {content} = req.body;
  const id=req.params.id;
  try {
    // Find existing component with the same number
    const existingComponent = await Component.findOne(
        {component_number: id, is_active: true});

    if (existingComponent) {
      // Update existing component
      existingComponent.content = content;
      await existingComponent.save();
      await OperationCount.findOneAndUpdate(
          {operation_type: "update",
            component_number: existingComponent.component_number},
          {$inc: {count: 1}},
          {upsert: true},
      );
      responseUtil.success(res, 200, "Component content updated successfully");
    } else {
      responseUtil.error(res, 404, "Component not found");
    }
  } catch (err) {
    console.error(err);
    responseUtil.error(res, 500, "Internal server error");
  }
};

// componentController.js

exports.getActiveContent = async (req, res) => {
  try {
    const activeComponents = await Component.find({is_active: true});
    responseUtil.success(res, 200,
        "Active components retrieved successfully", activeComponents);
  } catch (err) {
    console.error(err);
    responseUtil.error(res, 500, "Internal server error");
  }
};

exports.getComponentOperationCount = async (req, res) => {
  const {component_number} = req.params;

  try {
    const operationCounts = await OperationCount.find({component_number});
    if (operationCounts) {
      responseUtil.success(res, 200,
          "Operation counts retrieved successfully", operationCounts);
    } else {
      responseUtil.success(res, 200,
          "No operation counts found for the component");
    }
  } catch (err) {
    console.error(err);
    responseUtil.error(res, 500, "Internal server error");
  }
};

