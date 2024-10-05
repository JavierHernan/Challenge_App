//For Leaderboards
const express = require('express')
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { CompletedBounty } = require('../../db/models')

router.get('/', async (req, res) => {
    try {
        const completedBounties = await CompletedBounty.findAll();

        return res.json(completedBounties); // Return the list of completed bounties
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    const { userId, bountyId, completed } = req.body;

    const newCompletedBounty = await CompletedBounty.create({ userId, bountyId, completed });
    return res.json(newCompletedBounty);
});

module.exports = router;