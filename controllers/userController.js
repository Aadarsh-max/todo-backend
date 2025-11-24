import User from "../models/userModel.js";
import Task from "../models/taskModel.js";
import sendEmail from "../utils/sendEmail.js";

export const upsertUser = async (req, res) => {
  try {
    const { firebaseUID, name, email, photoURL } = req.body;

    if (!firebaseUID || !email) {
      return res.status(400).json({ message: "Missing firebaseUID or email" });
    }
    let user = await User.findOne({ firebaseUID });
    if (!user) {
      user = await User.create({
        firebaseUID,
        email,
        name: name || "New User",
        email,
        photoURL,
      });
      // Welcome Email
      await sendEmail(
        email,
        "🎉 Welcome to ToDoList – Let's Get Organized!",
        `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 10px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Welcome to ToDoList! 🎉</h1>
      </div>
      
      <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <h2 style="color: #333333; margin-top: 0;">Hello, ${
          name || "User"
        }! 👋</h2>
        
        <p style="color: #555555; line-height: 1.6; font-size: 16px;">
          We're absolutely thrilled to have you join the <strong>ToDoList community</strong>! Your journey to better productivity starts right now.
        </p>
        
        <div style="background-color: #f0f4ff; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0; border-radius: 5px;">
          <p style="color: #333333; margin: 0; line-height: 1.6;">
            <strong>What you can do with ToDoList:</strong><br>
            ✅ Create and organize tasks effortlessly<br>
            ✅ Track your progress in real-time<br>
            ✅ Never miss important deadlines<br>
            ✅ Stay focused and accomplish more every day
          </p>
        </div>
        
        <p style="color: #555555; line-height: 1.6; font-size: 16px;">
          We're here to help you transform your daily workflow and achieve your goals with ease. Let's make every day more productive and organized together!
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://todolist-skillcoders.vercel.app" 
             style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                    color: #ffffff; 
                    padding: 15px 40px; 
                    text-decoration: none; 
                    border-radius: 50px; 
                    font-weight: bold; 
                    font-size: 16px;
                    display: inline-block;
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
            Get Started Now →
          </a>
        </div>
        
        <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;">
        
        <p style="color: #888888; font-size: 14px; text-align: center; margin: 0;">
          Need help? We're here for you! Just reply to this email.<br>
          <strong style="color: #667eea;">SkillCoders by Aadarsh Shrivastav</strong>
        </p>
      </div>
    </div>
    `
      ).catch((err) => console.error("Error sending welcome email:", err));

      return res.status(201).json(user);
    } else {
      // Send Welcome Back
    await sendEmail(
        email,
        "✅ Welcome Back to ToDoList – Ready to Conquer Today?",
        `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 10px;">
      <div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Welcome Back! ✅</h1>
      </div>
      
      <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <h2 style="color: #333333; margin-top: 0;">Hi ${
          user.name || "User"
        }! 👋</h2>
        
        <p style="color: #555555; line-height: 1.6; font-size: 16px;">
          Great to see you again! We're excited to help you stay on top of your tasks and crush your goals today.
        </p>
        
        <div style="background-color: #f0fff4; padding: 20px; border-left: 4px solid #38ef7d; margin: 20px 0; border-radius: 5px;">
          <p style="color: #333333; margin: 0; line-height: 1.6;">
            <strong>Your productivity hub awaits:</strong><br>
            📝 Manage your daily tasks seamlessly<br>
            🎯 Add new goals and priorities<br>
            ⚡ Keep your momentum going strong<br>
            🏆 Make today another win
          </p>
        </div>
        
        <p style="color: #555555; line-height: 1.6; font-size: 16px;">
          Thank you for choosing ToDoList as your productivity partner. Let's make today count and accomplish amazing things together!
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.CLIENT_URL}/home" 
             style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); 
                    color: #ffffff; 
                    padding: 15px 40px; 
                    text-decoration: none; 
                    border-radius: 50px; 
                    font-weight: bold; 
                    font-size: 16px;
                    display: inline-block;
                    box-shadow: 0 4px 15px rgba(56, 239, 125, 0.4);">
            Continue to Dashboard →
          </a>
        </div>
        
        <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;">
        
        <p style="color: #888888; font-size: 14px; text-align: center; margin: 0;">
          Questions or feedback? We'd love to hear from you!<br>
          <strong style="color: #11998e;">SkillCoders by Aadarsh Shrivastav</strong>
        </p>
      </div>
    </div>
    `
      ).catch((err) => console.error("Error sending welcome back email:", err));

      return res.status(200).json(user);
    }
  } catch (err) {
    console.error("Upsert user error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getProfileWithStats = async (req, res) => {
  try {
    const { uid } = req.params;
    if (!uid) {
      return res.status(400).json({ message: "Missing Firebase UID" });
    }
    let user = await User.findOne({ firebaseUID: uid });
    if (!user) {
      user = await User.create({
        firebaseUID: uid,
        name: "New User",
        email: "unknown@mail.com",
      });
    }
    const tasks = await Task.find({ firebaseUID: uid });
    res.status(200).json({ user, tasks });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: err.message });
  }
};
