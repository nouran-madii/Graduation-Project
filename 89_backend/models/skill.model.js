import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Skills name is required"],
        trim: true,
        minLength: 2,
        maxLength: 50,
    }
})

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;