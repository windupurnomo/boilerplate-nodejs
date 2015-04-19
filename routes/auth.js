var ctrl = require('../controllers/auth.js');

module.exports = function(router) {
    router.post('/login', ctrl.login);
    router.get('/test', ctrl.test);    
    return router;
};