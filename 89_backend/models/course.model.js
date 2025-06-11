import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Course name is required"],
        trim: true,
        minLength: 3,
        maxLength: 25,
    },

    link: {
        type: String,
        required: [true, "Course link is required"],
    },

    skills_taught: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }]

}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

export default Course;