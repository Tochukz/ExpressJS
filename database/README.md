# Database

## Sequelize
__Install Dependencies__   
Install the Sequelize package  
```
> npm install sequelize
```
Install your chosen database driver. For MySQL database Sequelize uses `mysql2`.  
```
> npm install mysql2
```

### Sequelize Migrations  
__Install Sequelize CLI__    
```
> npm install --save sequelize-cli
```

__Bootstrapping sequelize scaffolding__
```
> npx sequelize-cli init
```  
This will generate `config/config.json`, `models/index.js`, `migrations` and `seeders` files/directories.  

__Create a database__    
```
> npx sequelize-cli db:create ojlinks_books
```
__Create a Staff model and it's migrations__  
```
> npx sequelize-cli model:generate --name Staff --attributes staffId:number,firstname:string,lastname:string,email:string  
```
This will generate the model `models/staff.js` and a migrations `migrations/xxxxxxxxxxx-create-staff.js`  

__To generate a migration only__     
```
> npx sequelize-cli migration:generate --name create-user
```
This will generate `migrations/xxxxxxxxxx-create-user.js` migration file.  

__Run the migration to create the table__  
```
> npx sequelize-cli db:migrate  
```

__Revert most recent migration__      
```
> npx sequelize-cli db:migrate:undo
```  

__Revert all migrations__    
```
> npx sequelize-cli db:migrate:undo:all
```  

__Revert back to a specific migration__     
```
> npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js
```  

__Create a Seeder__    
```
> npx sequelize-cli seed:generate --name staff
```  

__Running all seeders__   
```
> npx sequelize-cli db:seed:all
```
__Running a specific seeder__  
```
> npx sequelize-cli db:seed --seed 20210131083031-users
```
__Undo most recent seeding__    
```
> npx sequelize-cli db:seed:undo
```

__Undo a specific seed__  
```
> npx sequelize-cli db:seed:undo --seed xxxxxxxxx-staff
```  

__Undo all seeds__    
```
> npx sequelize-cli db:seed:undo:all
```  

### Sequelize Association  
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


## Mongoose  
[Doc Guide](https://mongoosejs.com/docs/guide.htm)
### Defining Schema    
Schemas not only define the structure of your document and casting of properties, they also define documents _instance methods_, _static Model methods_, _compound indexes_, and document lifecycle hooks called _middleware_.    

__Instance methods__
Do not declare instance methods or static method on your model using ES6 arrow functions (=>). Arrow functions explicitly prevent binding this, so your method will not have access to the document.  

__Indexes__  
Learn more...

__Schema Options__  
See [guide options](https://mongoosejs.com/docs/guide.html#options) for details of the schema options

## SQLite
__Install NPM packages__  
```
> npm install sqlite3
> npm install sequelize
```
You can use the `sequelize-cli` package to develop your models and run your migration.
```
> npm install sequelize-cli --save-dev
```
A few `sequelize-cli` commands may not be support in `SQLite` For example the `db:create` and `db:drop` command are not supported but a whole lot others are supported.

__Migrating__  
You can use `sequelize-cli` to generate and run migrations in `SQLite`
To generate a model and migration
```
> npx sequelize-cli model:generate --name Staff --attributes staffId:number,firstname:string,lastname:string,email:string  
```
This will generate the model `models/staff.js` and a migrations `migrations/xxxxxxxxxxx-create-staff.js` .  
Other `sequelize-cli` commands also work the same. For example to run a seeder
```
> npx sequelize-cli db:seed:all  
```

__Model Syncing__  
Another way to create and modify tables is to use the `sync` method of the model.  For example calling `User.sync()` will create the table if it doesn't exist.
You call pass the option `User.sync({force: true})` to drop and recreate the table or `User.sync({force })` to alter the table based on changes on your model.   
You can conveniently put this into a script file and run it as your migration as an `npm` script.
