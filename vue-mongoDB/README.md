# vue

> vue mongodb

## Build Setup

``` bash
#Installation
#Prerequisites: Node.js (>=6.x, 8.x preferred), npm version 3+ and Git.

$ npm install -g vue-cli
#Usage
$ vue init <template-name> <project-name>
Example:

$ vue init webpack my-project
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

# mongodb
## schema: 一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力。
## Model: 由schema编译而成的假象的构造器，具有抽象属性和行为。
## Document：Model的每一个实例就是一个document。document可以保存到数据库和从数据库中取数据。

## mongodb 操作
### 服务启动： mongod
### 客户端启动：mongo
### 创建或者切换数据库：use demo
### 查看： show dbs => db
### 删除数据库： db.dropDatabase()

创建集合：
1. use test 先创建test数据库，
2. db.createCollection("demo")在创建集合
当然在 MongoDB 中，你不需要创建集合。当你插入一些文档时，MongoDB 会自动创建集合
> db.test.insert({"name" : "Ray", age: 18})
> show collections

demo
删除集合：
db.collectionName.drop()
插入文档：
db.COLLECTION_NAME.insert(document)
更新文档
更新第一条
db.test.update({'name': 'Ray'}, {$set: {'age': 10}})
db.test.updateOne({'name': 'Ray'}, {$set: {'age': 10}})
全部更新
第一个参数：是查询条件
第二个参数： update的对象
第三个参数： 默认是false，设置为true的时候，在不存在update的记录的时候，会插入一条新的
第四个参数：默认是fasle， 只更新一条。如果设置为true，会全部更新
db.test.update({'name': 'Ray'}, {$set: {'age': 10}}, false, true)
db.test.updateMany({'name': 'Ray'}, {$set: {'age': 10}})
save() 方法通过传入的文档来替换已有文档
db.test.save({ "_id" : ObjectId("5b520089c4303dcba52f5ee2"), "name" : "Ray", "age" : 18 })

创建和插入： db.demo.insert({username: "administrator", password: "test123", nickname: "管理员", description:  "我是管理员"})
db.demo.insert({username: "guest", password: "test123", nickname: "普通访客", age: 19})

查找某一条记录：db.demo.find().pretty()
    db.demo.find({"username": "administrator"}).pretty()

删除某一条记录：db.demo.remove({"username": "Ray"})
db.demo.deleteOne({"username": "Ray"})
删除所有数据： db.demo.remove({})
db.demo.deleteMany({})
