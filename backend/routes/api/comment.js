// Required CRUD
const express = require('express')
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');

const validateComment = [
    check('comment')
        .exists({ checkFalsy: true })  // Ensure the comment exists and is not empty
        .withMessage('Comment is required.')
        .isLength({ max: 300 })  // Ensure the comment is no longer than 300 characters
        .withMessage('Comment must be no more than 300 characters long.'),
    handleValidationErrors
]

//Get All Comments by Bounty id
router.get(
    '/:bountyId/comments',
    async (req, res, next) => {
        try {
            const { bountyId } = req.params;

            const comments = await Comment.findAll({
                where: { bountyId },
                include: { model: User, attributes: ['id', 'username'] } // Include user info if needed
            });

            if (!comments.length) {
                return res.status(404).json({ message: "No comments found for this bounty." });
            }

            return res.status(200).json(comments);
        } catch(error) {
            next(error)
        }
    }
)

//Create a Comment for a Bounty based on Bounty.id
router.post(
    '/:bountyId/comments',
    requireAuth, // Require user to be logged in
    validateComment, // Apply validation
    async (req, res, next) => {
        try {
            const { bountyId } = req.params;
            const { comment } = req.body;
            const userId = req.user.id;

            // Create new comment
            const newComment = await Comment.create({
                comment,
                bountyId,
                userId
            });

            return res.status(201).json(newComment);
        } catch (error) {
            next(error);
        }
    }
);

//Update a Comment belonging to Current User
router.put(
    '/:commentId',
    requireAuth,
    validateComment,
    async (req,res, next) => {
        try {
            const { commentId } = req.params;
            const { comment } = req.body;
            const userId = req.user.id;

            const commentToUpdate = await Comment.findByPk(commentId);

            if (!commentToUpdate) {
                return res.status(404).json({ message: "Comment not found." });
            }

            if (commentToUpdate.userId !== userId) {
                return res.status(403).json({ message: "You are not authorized to update this comment." });
            }

            // Update comment
            await commentToUpdate.update({ comment });

            return res.status(200).json(commentToUpdate);
        } catch (error) {
            next(error);
        }
    }
)

//Delete a Comment belonging to Current User
router.delete(
    '/:commentId',
    requireAuth,
    async (req, res, next) => {
        try {
            const { commentId } = req.params;
            const userId = req.user.id;

            const commentToDelete = await Comment.findByPk(commentId);

            if (!commentToDelete) {
                return res.status(404).json({ message: "Comment not found." });
            }

            if (commentToDelete.userId !== userId) {
                return res.status(403).json({ message: "You are not authorized to delete this comment." });
            }

            // Delete comment
            await commentToDelete.destroy();

            return res.status(200).json({ message: "Comment successfully deleted." });
        } catch (error) {
            next(error);
        }
    }
)

module.exports = router;