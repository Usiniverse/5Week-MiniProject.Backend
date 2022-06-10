const express = require("express");
const Comment = require("../models/comment")
const authMiddleware = require("../middlewares/auth-middleware");