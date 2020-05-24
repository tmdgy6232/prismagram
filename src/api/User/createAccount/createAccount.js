export default {
  Mutation: {
    createAccount: async (_, args, { prisma }) => {
      console.log(prisma);
      const {
        username,
        email,
        firstName = "",
        lastName = "",
        bio = "",
        loginSecret,
      } = args;
      // const user = await prisma.createUser({
      //   username,
      //   email,
      //   firstName,
      //   lastName,
      //   bio,
      //   loginSecret,
      // });
      // console.log(user);
      //  return user;
      return null;
    },
  },
};
