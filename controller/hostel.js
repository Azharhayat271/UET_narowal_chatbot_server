const Student = require('../modals/hostel');

// Register a new student
exports.createStudent = async (req, res) => {
    const student = new Student(req.body);
    try {
        await student.save();
        res.status(201).send(student);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find({});
        res.send(students);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a student by id
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).send();
        }
        res.send(student);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a student by id
exports.updateStudentById = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!student) {
            return res.status(404).send();
        }
        res.send(student);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a student by id
exports.deleteStudentById = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).send();
        }
        res.send(student);
    } catch (error) {
        res.status(500).send(error);
    }
};
