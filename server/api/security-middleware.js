const isLoggedIn = (req, res, next) => {
  if (req.user) return next()
  return res.sendStatus(401)
}

const isAdmin = (req, res, next) => {
  if (req.user && req.user.admin) return next()
  return res.sendStatus(401)
}

const AdminOrSelf = (req, res, next) => {
  if (req.user && (req.user.admin || req.user.id === req.params.userId))
    return next()
  return res.sendStatus(401)
}

module.exports = {
  isAdmin,
  isLoggedIn,
  AdminOrSelf
}
