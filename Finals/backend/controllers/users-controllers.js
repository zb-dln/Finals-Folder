const login = async (req, res, next) => {
  const { email, password } = req.body;

  console.log("Request body received:", req.body);
  console.log("Login attempt for email:", email);

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
    console.log("User query result:", existingUser);
  } catch (err) {
    console.log("Database query error:", err);
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    console.log("No user found with email:", email);
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  if (existingUser.password !== password) {
    console.log("Password mismatch for user:", email);
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  console.log("Login successful for user:", email);
  res.json({
    message: "Logged in!",
    userId: existingUser.id,
    email: existingUser.email,
  });
};