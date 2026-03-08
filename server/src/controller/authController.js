export const Register = async (req, res, next) => {
  try {
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const Login = async (req, res, next) => {
  try {
    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    next(error);
  }
};

export const Logout = async (req, res, next) => {
  try {
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export const Profile = async (req, res, next) => {
  try {
    res.status(200).json({ message: "User profile retrieved successfully" });
  } catch (error) {
    next(error);
  }
};

export const ChangePassword = async (req, res, next) => {
  try {
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};

export const ForgotPassword = async (req, res, next) => {
  try {
    res.status(200).json({ message: "Password reset link sent successfully" });
  } catch (error) {
    next(error);
  }
};

export const ResetPassword = async (req, res, next) => {
  try {
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
};
