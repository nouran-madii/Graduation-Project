import { PythonShell } from "python-shell";

export const recommend = async (req, res, next) => {
  try {
    const user = req.user;
    const input = { title: user.title || "" };

    if (!input.title) {
      return res.status(400).json({ error: "User title missing" });
    }

    const options = {
      mode: 'text',
      pythonOptions: ['-u'],
      scriptPath: './',
    };

    const shell = new PythonShell('recommend.py', options);

    let output = "";

    shell.stdout.on('data', (data) => {
      output += data;
    });

    shell.stderr.on('data', (err) => {
      console.error("Python error:", err.toString());
    });

    shell.on('close', () => {
      try {
        const recommendations = JSON.parse(output);
        res.status(200).json({
          success: true,
          message: "successfully.",
          data: recommendations,
        });
      } catch (e) {
        next(e);
      }
    });

    // Send JSON input to Python script via stdin
    shell.send(JSON.stringify(input));
    shell.end();

  } catch (error) {
    next(error);
  }
};
