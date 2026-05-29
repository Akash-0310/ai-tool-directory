const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const Message = require('../models/Message');

const router = express.Router();

const inMemoryMessages = [];

router.post(
  '/',
  [
    body('name').trim().isLength({ min: 2 }).withMessage('Name is too short'),
    body('email').trim().isEmail().withMessage('Valid email required'),
    body('subject').trim().isLength({ min: 3 }).withMessage('Subject is too short'),
    body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: errors.array()[0].msg,
          errors: errors.array(),
        });
      }

      const payload = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
      };

      if (mongoose.connection.readyState === 1) {
        await Message.create(payload);
      } else {
        inMemoryMessages.push({ ...payload, createdAt: new Date() });
      }

      res.json({
        success: true,
        message: 'Thanks for reaching out — we\'ll get back to you shortly.',
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
