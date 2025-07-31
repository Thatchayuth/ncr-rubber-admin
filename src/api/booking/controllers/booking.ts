// src/api/booking/controllers/booking.ts
import { factories } from '@strapi/strapi';
import { getIO } from '../../../extensions/websocket/server';

export default factories.createCoreController('api::booking.booking', ({ strapi }) => ({
  async create(ctx) {
    const response = await super.create(ctx);
    const booking = response.data;

    console.log('🎉 รับ request สร้าง booking:', booking);
    const io = getIO();

   const fullData = await strapi.entityService.findOne(
      'api::booking.booking',
      response.data.id,
      {
        populate: ['room'], // 👈 สำคัญ!
      }
    );

  
    io.emit('bookingCreated', fullData);

    // ส่ง response กลับ frontend พร้อมข้อมูล room
    return { data: fullData };
  },
}));
