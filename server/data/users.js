import bcrypt from "bcryptjs";

const users = [
  {
    firstName: "admin",
    lastName: "user",
    email: "admin@email.com",
    password: bcrypt.hashSync("admin123", 10),
    isAdmin: true,
    verified: true,
  },
];

export default users;
