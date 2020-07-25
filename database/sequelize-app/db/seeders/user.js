const colors = require('colors');
const User = require('../../models/User');

class UserSeeder {
    static data() {
        return [
            {
                username: 'James@Bond',
                email: 'james@b.google.com',
                password: 'sbikknlg'
            },
            {
                username: 'KelvJ',
                email: 'kel@yahoo.com',
                password: 'adjolmfe'
            },
            {
                username: 'tundeK',
                email: 'k@tunde.outlook.com',
                password: '13knomrpwr'
            }
        ]
    }
    static async seed() {
      let total = 0; 
      await UserSeeder.data().forEach( async (record, index) => {
        const result = await User.create(record);
        if (!result) {
            console.log(`Error when create record ${index} ${recors.username}`);
        }
        total = index + 1;
      });
      return total
    }
}

module.exports = UserSeeder;