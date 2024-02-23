
import { Project } from "../models/ProjectOrderModel.js";
import { setMongooseid } from "../Helper/MongooseId.js";
import { sendEmail } from "../assets/nodemailer.js";
import { uploadFileToFirebase } from "../assets/firebase.js";

export const createProjectOrder = async (req, res) => {
  try {
    const {
      projectTitle,
      companyName,
      startDate,
      Deadline,
      customerId,
      orderId,
      additionalNote,
      email
    } = req.body;

    const logoFile = req.files[0]; // Access the first file
    const additionalFile = req.files[1]; // Access the second file

    console.log('files', logoFile, additionalFile);

    let logoFileData = null;
    let attachmentFileData = null;

    if (logoFile) {
      const logoResult = await uploadFileToFirebase(logoFile, "Project Files");
      logoFileData = {
        downloadURL: logoResult.downloadURL,
        name: logoResult.name,
        type: logoResult.type,
      };
    }

    if (additionalFile) { // Check if additionalFile exists
      const attachmentResult = await uploadFileToFirebase(additionalFile, "Project Files");
      attachmentFileData = {
        downloadURL: attachmentResult.downloadURL,
        name: attachmentResult.name, // Change from name to filename
        type: attachmentResult.type,
      };
    }

    const project = new Project({
      projectTitle,
      companyName,
      startDate,
      Deadline,
      additionalNote,
      customerId,
      orderId,
      logoFile: logoFileData,
      attachmentFile: attachmentFileData,
    });

    await project.save();
    await sendEmail({ email, emailType: "ADDPROJECTORDER", orderId: project.orderId })
    res.status(201).json({
      msg: "Project Order Placed Successfully",
      project: project.orderId
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({createdAt: -1});
    setMongooseid();
    res.json({ data: projects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }
    setMongooseid();
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { projectTitle, companyName, startDate, Deadline, additionalNote } =
      req.body;

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }

    // Check if files are uploaded
    const logoFile = req.files["logo"][0];
    const attachmentFile = req.files["attachment"][0];

    project.projectTitle = projectTitle || project.projectTitle;
    project.companyName = companyName || project.companyName;
    project.startDate = startDate || project.startDate;
    project.Deadline = Deadline || project.Deadline;
    project.additionalNote = additionalNote || project.additionalNote;
    project.logoFile = logoFile.filename || project.logoFile;
    project.attachmentFile = attachmentFile.filename || project.attachmentFile;

    await project.save();

    res
      .status(201)
      .json({ msg: "Project updated successfully", project: project });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }
    res.json({ message: "Project deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
