const { expressjwt: jwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.JSON_WEB_TOKEN_SECRET_KEY;
  return jwt({
    secret: secret,
    algorithms: ["HS256"],
    credentialsRequired: false, // Allows requests without a token
  }).unless({
    path: [
      // Public routes that don't require JWT
      { url: /\/api\/user\/login/, methods: ["POST"] },
      { url: /\/api\/user\/register/, methods: ["POST"] },
    ],
  });
}

module.exports = authJwt;
