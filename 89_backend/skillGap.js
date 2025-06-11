import { PythonShell } from "python-shell";
import path from "path";
import Job from "./models/job.model.js";
import Skill from "./models/skill.model.js";

export const analyze = async (req, res) => {
  try {
    const user = req.user;
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({ error: "Job ID is required" });
    }

    const jobSeeker = user;
    const role = await Job.findById(jobId);

    if (!jobSeeker || !jobSeeker.skills || jobSeeker.skills.length === 0) {
      return res.status(404).json({ error: "Job seeker skills not found" });
    }

    if (!role || !role.requirements) {
      return res
        .status(404)
        .json({ error: "Job role or requirements not found" });
    }

    // Populate skill names from IDs
    const skills = await Skill.find({ _id: { $in: jobSeeker.skills } });
    const skillNames = skills.map((skill) => skill.name.toLowerCase());

    const inputData = {
      user_skills: skillNames.join(", "),
      job_requirements: role.requirements,
      job_title: role.title,
    };

    console.log("Sending to Python:", inputData);

    const options = {
      mode: "json",
      pythonOptions: ["-u"],
      scriptPath: "./",
      args: [JSON.stringify(inputData)],
    };

    const shell = new PythonShell("skillGap.py", options);

    // Timeout to kill Python script if it hangs
    const timeout = setTimeout(() => {
      shell.terminate();
      return res.status(500).json({ error: "Python script timed out" });
    }, 10000); // 10 seconds

    shell.on("message", (message) => {
      clearTimeout(timeout);
      console.log("Python message:", message);

      // message is already parsed JSON because mode: 'json'
      if (message.error) {
        return res
          .status(500)
          .json({ error: "Python analysis error", details: message.error });
      }

      return res.json({
        success: true,
        similarityScore: message.similarity_score,
        missingSkills: message.gap_analysis.missing_skills,
        matchedSkills: message.gap_analysis.matched_skills,
        currentSkills: skillNames,
        requiredSkills: role.requirements,
      });
    });

    shell.end((err) => {
      clearTimeout(timeout);
      if (err) {
        console.error("PythonShell error:", err);
        return res
          .status(500)
          .json({ error: "PythonShell failed", details: err.message });
      }
    });
  } catch (error) {
    console.error("Server error:", error);
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};
