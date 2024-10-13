const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();

// Get all employees
router.get('/employees', async (req, res) => {
  const employees = await Employee.find();
  res.status(200).json(employees);
});

// Get employee by ID
router.get('/employees/:eid', async (req, res) => {
  const employee = await Employee.findById(req.params.eid);
  res.status(200).json(employee);
});

// Create a new employee
router.post('/employees', async (req, res) => {
  const employee = new Employee(req.body);
  await employee.save();
  res.status(201).json({ message: 'Employee created successfully', employee_id: employee._id });
});

// Update employee details
router.put('/employees/:eid', async (req, res) => {
  await Employee.findByIdAndUpdate(req.params.eid, req.body);
  res.status(200).json({ message: 'Employee details updated successfully' });
});

// Delete employee by ID
//router.delete('/employees', async (req, res) => {
  //await Employee.findByIdAndDelete(req.query.eid);
  //res.status(204).json({ message: 'Employee deleted successfully' });
//});
router.delete('/employees/:eid', async (req, res) => {
    try {
      const employeeId = req.query.eid;
      console.log('Employee ID:', employeeId); // Log to verify
  
      if (!employeeId) {
        return res.status(400).json({ message: 'Employee ID is required' });
      }
  
      const employee = await Employee.findByIdAndDelete(employeeId);
      if (!employee) {
        console.log('Employee not found');
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.status(204).json({ message: 'Employee deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router;
