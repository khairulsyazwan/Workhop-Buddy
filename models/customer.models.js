customerSchema.pre("save", function (next) {
    var user = this;
    if (!user.isModified("password")) return next();
  
    var hash = bcrypt.hashSync(user.password, 10);
  
    user.password = hash;
    next();
  });