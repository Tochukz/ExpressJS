## Database

### Sequelize
__Install Dependencies__   
Install the Sequelize package  
```
> npm install sequelize
```
Install your chosen database driver. For MySQL database Sequelize uses `mysql2`.  
```
> npm install mysql2
```

### Migrations  
Install Sequelize CLI  
```
> npm install --save sequelize-cli
```

Bootstrapping sequelize scaffolding
```
> npx sequelize-cli init
```  
This will generate `config/config.json`, `models/index.js`, `migrations` and `seeders` files/directories.  

Create a database  
```
> npx sequelize-cli db:create ojlinks_books
```
Create a Staff model and it's migrations
```
> npx sequelize-cli model:generate --name Staff --attributes staffId:number,firstname:string,lastname:string,email:string  
```
This will generate the model `models/staff.js` and a migrations `migrations/xxxxxxxxxxx-create-staff.js`  

To generate a migration only   
```
> npx sequelize-cli migration:generate --name create-user
```
This will generate `migrations/xxxxxxxxxx-create-user.js` migration file.  

Run the migration to create the table
```
> npx sequelize-cli db:migrate  
```

Revert most recent migration   
```
> npx sequelize-cli db:migrate:undo
```  

Revert all migrations  
```
> npx sequelize-cli db:migrate:undo:all
```  

Revert back to a specific migration  
```
> npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js
```  

Create a Seeder  
```
> npx sequelize-cli seed:generate --name staff
```  

Running Seeds
```
> npx sequelize-cli db:seed:all
```

Undo most recent seeding  
```
> npx sequelize-cli db:seed:undo
```

Undo a specific seed
```
> npx sequelize-cli db:seed:undo --seed xxxxxxxxx-staff
```  

Undo all seeds  
```
> npx sequelize-cli db:seed:undo:all
```  

### Association  
In an association, the model that the function is being invoked on is the _source_ and the model that is passed as an argument is the _target_. For example  
```
User.hasOne(Project)
```
`User` is the source model and `Project` is the target model.  

__BelongsTo__  
_BelongsTo_ associations are associations where the foreign key for the one-to-one relation exists on the source model.  
```
Player.belongsTo(Team)
```  
Here the foreign key exists on the `Player` model.
