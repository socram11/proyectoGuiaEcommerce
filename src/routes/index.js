const userRoutes = require("./userRoutes");
const articleRoutes = require("./articleRoutes");

module.exports = (app) => {
  app.use("/users", userRoutes);
  app.use("/articles", articleRoutes);
};
