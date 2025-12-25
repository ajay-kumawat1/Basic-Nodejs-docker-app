import express, { Request, Response } from "express";

const app = express();
const PORT: number = parseInt(process.env.PORT || "3000", 10);

// Middleware to parse JSON
app.use(express.json());

// Home route
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Welcome to the Basic Node.js Express App!",
    status: "running",
  });
});

// Health check route
app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
