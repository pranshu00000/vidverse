const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from "Bearer <token>"
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
      req.user = verified; // Attach the user to the request
      next(); // Proceed to the next middleware
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
  
module.exports = authenticateToken;
