import authRouter from "./authRoutes.js";
import userRouter from "./userRoutes.js";

//ADD ALL MAJOR ROUTES HERE
const setupRoutes = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/users", userRouter);
};

export default setupRoutes;
