import mongoose from "mongoose";


const enrollmentSchema = new mongoose.Schema({
    jobSeeker: { type: mongoose.Schema.Types.ObjectId, ref: 'JobSeeker' },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    enrolledAt: { type: Date, default: Date.now }
  });

  const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

  export default Enrollment;