import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import {
  isAdmin,
  isAuth,
  isSellerOrAdmin,
  getMailgunClient,
  payOrderEmailTemplate,
} from '../utils.js';
import {
  aggregateOrderSummary,
  findOrderById,
  findOrdersForUser,
  insertOrder,
  deleteOrderById,
  updateOrderById,
  listOrdersSellerFilter,
  findUserById,
} from '../store.js';

const orderRouter = express.Router();

const orderWithUserName = (order) => {
  const user = order.user ? findUserById(order.user) : null;
  return {
    ...order,
    user: user ? { _id: user._id, name: user.name, email: user.email } : null,
  };
};

orderRouter.get(
  '/',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const seller = req.query.seller || '';
    const orders = listOrdersSellerFilter(seller).map((o) =>
      orderWithUserName(o)
    );
    res.send(orders);
  })
);

orderRouter.get(
  '/summary',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    res.send(aggregateOrderSummary());
  })
);

orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = findOrdersForUser(req.user._id);
    res.send(orders);
  })
);

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'Cart is empty' });
    } else {
      const createdOrder = insertOrder({
        seller: req.body.orderItems[0].seller,
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        paymentResult: undefined,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
        isPaid: false,
        isDelivered: false,
      });
      res
        .status(201)
        .send({ message: 'New Order Created', order: createdOrder });
    }
  })
);

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = findOrderById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = findOrderById(req.params.id);
    if (order) {
      updateOrderById(req.params.id, (o) => {
        o.isPaid = true;
        o.paidAt = Date.now();
        o.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.email_address,
        };
      });
      const updatedOrder = findOrderById(req.params.id);
      const user = updatedOrder?.user ? findUserById(updatedOrder.user) : null;
      try {
        if (
          user &&
          process.env.MAILGUN_API_KEY &&
          process.env.MAILGUN_DOMAIN
        ) {
          const mg = getMailgunClient();
          await mg.messages.create(
            process.env.MAILGUN_DOMAIN || 'mg.yourdomain.com',
            {
              from: 'BlinkBasket <blinkbasket@mg.yourdomain.com>',
              to: `${user.name} <${user.email}>`,
              subject: `New order ${updatedOrder._id}`,
              html: payOrderEmailTemplate({
                ...updatedOrder,
                user,
              }),
            }
          );
          console.log('Email sent successfully');
        }
      } catch (err) {
        console.log('Email error:', err);
      }

      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = deleteOrderById(req.params.id);
    if (order) {
      res.send({ message: 'Order Deleted', order });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put(
  '/:id/deliver',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const updated = updateOrderById(req.params.id, (o) => {
      o.isDelivered = true;
      o.deliveredAt = Date.now();
    });
    if (updated) {
      res.send({ message: 'Order Delivered', order: updated });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

export default orderRouter;
