const User = require("../models/user");

exports.userSeed = async () => {
    await User.create({
      email: "dylan98@gmail.com",
      username: "DylanEb",
      password: "123",
    })

  }
