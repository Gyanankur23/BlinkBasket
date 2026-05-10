import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import { generateToken, isAdmin, isAuth } from '../utils.js';
import {
  insertUser,
  findUserByEmail,
  findUserById,
  listUsers,
  deleteUserById,
  updateUserById,
} from '../store.js';

const userRouter = express.Router();

userRouter.get(
  '/top-sellers',
  expressAsyncHandler(async (req, res) => {
    const topSellers = listUsers()
      .filter((u) => u.isSeller)
      .sort((a, b) => (b.seller?.rating || 0) - (a.seller?.rating || 0))
      .slice(0, 3)
      .map((u) => ({ ...u, password: undefined }));
    res.send(topSellers);
  })
);

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    const createdUsers = [];
    for (const u of data.users) {
      if (findUserByEmail(u.email)) continue;
      const doc = insertUser({
        name: u.name,
        email: u.email,
        password: u.password,
        isAdmin: u.isAdmin,
        isSeller: u.isSeller,
        seller: u.seller,
      });
      createdUsers.push(doc);
    }
    res.send({ createdUsers });
  })
);

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = findUserByEmail(req.body.email);
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isSeller: user.isSeller,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    if (findUserByEmail(req.body.email)) {
      res.status(400).send({ message: 'User already exists' });
      return;
    }
    const createdUser = insertUser({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      isAdmin: false,
      isSeller: false,
    });
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      isSeller: createdUser.isSeller,
      token: generateToken(createdUser),
    });
  })
);

userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = findUserById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (user.isSeller) {
        user.seller.name = req.body.sellerName || user.seller.name;
        user.seller.logo = req.body.sellerLogo || user.seller.logo;
        user.seller.description =
          req.body.sellerDescription || user.seller.description;
      }
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      user.updatedAt = new Date().toISOString();
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(user),
      });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = listUsers().map((u) => ({
      ...u,
      password: undefined,
    }));
    res.send(users);
  })
);

userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = findUserById(req.params.id);
    if (user) {
      if (
        user.email === 'admin@example.com' ||
        user.email === 'admin@blinkbasket.com'
      ) {
        res.status(400).send({ message: 'Can Not Delete Admin User' });
        return;
      }
      const deleted = deleteUserById(req.params.id);
      res.send({ message: 'User Deleted', user: deleted });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = updateUserById(req.params.id, (u) => {
      u.name = req.body.name || u.name;
      u.email = req.body.email || u.email;
      u.isSeller = Boolean(req.body.isSeller);
      u.isAdmin = Boolean(req.body.isAdmin);
    });
    if (user) {
      res.send({ message: 'User Updated', user });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = findUserById(req.params.id);
    if (user) {
      res.send({ ...user, password: undefined });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

export default userRouter;
