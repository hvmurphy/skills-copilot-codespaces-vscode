// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Store comments
const commentsByPostId = {};

// Get comments for a post
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

// Create a comment
app.post('/posts/:id/comments', (req, res) => {
    // Generate a random id
    const commentId = randomBytes(4).toString('hex');
    // Get the content of the comment
    const { content } = req.body;
    // Get the comments for the post
    const comments = commentsByPostId[req.params.id] || [];
    // Add the new comment to the array
    comments.push({ id: commentId, content });
    // Store the comments
    commentsByPostId[req.params.id] = comments;
    // Send the comment back
    res.status(201).send(comments);
});

// Start the server
app.listen(4001, () => {
    console.log('Listening on 4001');
});