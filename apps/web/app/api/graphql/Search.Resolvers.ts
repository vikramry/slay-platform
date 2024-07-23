import mercury from "@mercury-js/core";


export default {
  Query: {
    hello: () => {
      return "Hello";
    },
    redisAvailability: async () => {
      try {
        console.log("sfdfhklkfbnkks");
        
        // await mercury.cache.set("TEST", "value")
        // console.log(await mercury.cache.get("TEST"));
        const response = await mercury.cache.client.PING();
        console.log(response);
        
        // console.log(await mercury.cache.client.ping());
        return "Connected"
        // return await mercury.cache.client.ping();
      } catch (error) {
        console.log(error);
        
        return "Error: \n";
      }
    }
  },
};
