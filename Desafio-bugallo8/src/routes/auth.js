// Obtener datos del usuario autenticado
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ user: req.user });
  });
  