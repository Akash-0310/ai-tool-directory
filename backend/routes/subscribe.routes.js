const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const Subscriber = require('../models/Subscriber');

const router = express.Router();
const memory = new Set();

router.post(
  '/',
  [body('email').trim().isEmail().withMessage('Enter a valid email address')],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
      }
      const email = req.body.email.toLowerCase();
      if (mongoose.connection.readyState === 1) {
        try {
          await Subscriber.create({ email });
        } catch (e) {
          if (e.code !== 11000) throw e;
        }
      } else {
        memory.add(email);
      }
      res.json({ success: true, message: 'Subscribed. Fresh AI tools every week.' });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
