const router = require('express').Router();

router.get('/', (req, res, next) => {
	res.redirect('/api/users');
});

router.use('/auth', require('./auth.routes'));
router.use('/users', require('./users.routes'));
router.use('/pets', require('./pets.routes'));

module.exports = router;
