import { initIO } from './extensions/websocket/server';

export default {
  register({ strapi }: { strapi: any }) {
    // ...
  },

  bootstrap({ strapi }: { strapi: any }) {
    const httpServer = strapi.server.httpServer;
    initIO(httpServer);

    // ให้ controller ใช้ได้ด้วย
    strapi.io = httpServer.io;
  },
};
