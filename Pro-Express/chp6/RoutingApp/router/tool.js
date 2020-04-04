const express = require('express');
const tool = require('../models/tool');

const router = express.Router();

router.param('id', (req, res, next, id) => {
  if (id == 'all') {
    return next();
  }
  tool.find(id, (err, tool) => {
    if (err) {
        return next(err);
    }
    req.tool = tool;
    next();
  });
});
// Similarly the router.use() and router.param() methods work the same as app.use()


router.get('/all', (req, res, next) => {
  tool.get((err, tools) => {
    if (err) {
      return next(err);
    }
    res.json(tools);
  });
});


router.route('/:id?')
      .get((req, res) => {
         res.json(req.tool);
       })
       .post((req, res, next) => {
         const {name, category, description, platform} = req.body;
         tool.create({name, category, description, platform}, (err, tool) => {
           if (err) {
             return next(err);
           }
           res.json(tool);
         });
       })
       .put((req, res, next) => {
         const body = req.body; 
         const data =  {
           id: body.id, 
           name: body.name, 
           category: body.category, 
           description: body.description, 
           platform: body.platform,
          };
         for(let prop in data) {
           if (data[prop] == undefined) {
              delete data[prop]
           }
         }
         tool.update(data, (err, tool) => {
           if (err) {
             return next(err);
           }
           res.json(tool);
         });
       })
       .delete((req, res, next) => {
          tool.delete(req.tool.id, (err, id) => {
            if (err) {
              return next(err);
            }
            res.json({msg: `Tool with id ${id} has been deleted.`})
          });          
       }) 

module.exports = router;

/**
 * Curl 
 * All
 * > curl http://localhost:9000/tool/all
 * 
 * FIND
 * > curl http://localhost:9000/tool/1
 * 
 * Delete
 * > curl -X DELETE localhost:9000/tool/4
 * 
 * POST
 * > curl -v -H "Content-Type: application/json" http://localhost:9000/tool -d  '{"name": "Sail", "category": "Framework", "description": "An opinionated NodeJS Framework", "platform": "Corss platform"}'
 *
 * PUT 
 * > curl -v -H "Content-Type: application/json" -X PUT  http://localhost:9000/tool -d  '{"id": 3, "name": "Nest", "description": "Next Generation NodeJS Framework based on Typescript"}'
 *
 */