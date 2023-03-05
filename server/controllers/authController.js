import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const register = async (req, res) => {
  try {
    const { firstName, lastName, occupation, email, password } = req.body;

    const isUserExist = await User.findOne({ email: email });
    if (isUserExist)
      return res
        .status(400)
        .send('Email Already Exists, Try with another Email');

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      occupation,
      email,
      password: passwordHash,
    });
    console.log('newUser: ', newUser);

    const savedUser = await newUser.save();

    res.status(201).send(savedUser);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: 'User does not exist!' });

    const isMached = await bcrypt.compare(password, user.password);
    if (!isMached) return res.status(400).json({ msg: 'Invalid credentials!' });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        occupation: user.occupation,
        email: user.email,
        updatedAt: user.updatedAt,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, occupation, email, password } = req.body;

    const isUserExist = await User.findById(userId);
    if (!isUserExist) return res.status(400).send('User Does not Exists');

    var passwordHash;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      passwordHash = await bcrypt.hash(password, salt);
    }

    const newUser = {
      firstName,
      lastName,
      occupation,
      email,
      password: passwordHash,
    };

    const savedUser = await User.findByIdAndUpdate(userId, newUser);
    const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);

    res.status(200).json({
      user: {
        _id: savedUser._id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        occupation: savedUser.occupation,
        email: savedUser.email,
        updatedAt: savedUser.updatedAt,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export { register, login, update };
