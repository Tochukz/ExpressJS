const prisma = require('@prisma/client');

class UserService {
  static getClient() {
    return new prisma.PrismaClient();
  }
  
  static async getUser(idStr) {
    const id = parseInt(idStr);
    const prismaClient = UserService.getClient();
    const users = await prismaClient.user.findUnique({ where: { id },  include: { post: true, profile: true}});
    prismaClient.$disconnect();
    return users;
  }

  static async getUsers() {
    const prismaClient = UserService.getClient();
    const users = await prismaClient.user.findMany({ include: { post: true, profile: true}});
    prismaClient.$disconnect();
    return users;
  }

  static async create(data) {
    const prismaClient = UserService.getClient();
    data.profile = {
      create: {
        bio: 'Just a new user'
      }
    };
    const user = await prismaClient.user.create({ data });
    prismaClient.$disconnect();
    return user;
  }

  static async update(data) {
    const {id, ...subData} = data;
    const prismaClient = UserService.getClient();
    await prismaClient.user.update({
        data: {...subData}, 
        where : { id }
    });
    const updatedUser = await UserService.getUser(id);
    prismaClient.$disconnect();
    return updatedUser;
  }

  static async destroy(idStr) {
    const id = parseInt(idStr);
    console.log(id);
    const prismaClient = UserService.getClient();
    const result = await prismaClient.$transaction([
      prismaClient.userProfile.delete({ where: { userId: id}}),
      prismaClient.user.delete({ where: { id }})
    ]);
    prismaClient.$disconnect();
    return result;
  }
}

module.exports = UserService;