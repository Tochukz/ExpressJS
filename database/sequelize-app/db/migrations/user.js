const colors = require('colors');
const User = require('../../models/User');

class UserMigration {
    static async migrate() {
        try {
            const result = await User.sync({ force: true});
            console.log(result.toString().green || 'User table created'.green);
            return result;
        } catch (err) {
            console.log(`${err}`.red);
            throw err;
        }
    }
}
module.exports = UserMigration;