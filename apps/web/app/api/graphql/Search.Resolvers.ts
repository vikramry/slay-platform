import mercury from "@mercury-js/core";

export default {
  Query: {
    hello: (root: any, {}, ctx: any) => {
      console.log(ctx);
      const { req } = ctx;
      console.log(req?.cookies, req?.headers);

      return "Hello";
    },
    dashboardAnalytics: async (root: any, {}, ctx: any) => {
      /*
        Revenue Received per day - compare the payment from last month revenue - Total month revenue
        Daily Order count - same compare with last week order count
        Customer Count 
        Top 5 most sold product - split by variant also if variant available (current month)
        Total orders per Shipment Status - total served orders till date
        Coupons used and most used coupons - Total Coupons
        Products which are almost out of stock
        average order value - compare over day, week, month
        cart analytics - customers added products to cart count 
        Top 5 customers - either by most orders or most revenue
      */

      const [
        orderRevenueInsights,
        orderShipmentStatusInsights,
        orderedProductVariantInsights,
        couponsInsights,
        inventoryInsights,
        customerInsights,
      ] = await Promise.all([
        mercury.db.Order?.mongoModel.aggregate([
          {
            $match: {
              date: {
                $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
              },
            },
          },
          {
            $lookup: {
              from: "invoices",
              localField: "invoice",
              foreignField: "_id",
              as: "invoice",
            },
          },
          {
            $unwind: "$invoice",
          },
          {
            $lookup: {
              from: "payments",
              localField: "invoice.payment",
              foreignField: "_id",
              as: "payment",
            },
          },
          {
            $unwind: "$payment",
          },
          {
            $match: {
              "payment.status": "SUCCESS",
            },
          },
          {
            $group: {
              _id: {
                date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
              },
              dailyRevenue: { $sum: { $toDouble: "$payment.amount" } },
              orderCount: { $sum: 1 },
            },
          },
          {
            $sort: { "_id.date": -1 },
          },
          {
            $project: {
              date: "$_id.date",
              _id: 0,
              dailyRevenue: 1,
              orderCount: 1,
            },
          },
        ]),
        mercury.db.Order?.mongoModel.aggregate([
          {
            $group: {
              _id: "$shipmentStatus",
              count: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 0,
              count: 1,
              status: "$_id",
            },
          },
        ]),
        mercury.db.Order?.mongoModel.aggregate([
          {
            $match: {
              date: {
                $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
              },
            },
          },
          {
            $lookup: {
              from: "invoicelines",
              localField: "invoice",
              foreignField: "invoice",
              as: "orderItems",
            },
          },
          {
            $unwind: "$orderItems",
          },
          {
            $lookup: {
              from: "productitems",
              localField: "orderItems.productItem",
              foreignField: "_id",
              as: "product",
            },
          },
          {
            $unwind: "$product",
          },
          {
            $lookup: {
              from: "variants",
              localField: "orderItems.variants",
              foreignField: "_id",
              as: "variants",
            },
          },
          {
            $unwind: "$variants",
          },
          {
            $group: {
              _id: {
                productId: "$orderItems.productItem",
                variant: "$orderItems.variants",
              },
              productName: { $first: "$product.name" },
              variantNames: { $first: "$variants.name" },
              totalQuantity: { $sum: "$orderItems.quantity" },
              totalRevenue: {
                $sum: {
                  $multiply: [
                    "$orderItems.quantity",
                    "$orderItems.pricePerUnit",
                  ],
                },
              },
            },
          },
          {
            $sort: { totalQuantity: -1 },
          },
          {
            $limit: 5,
          },
          {
            $project: {
              _id: 0,
            },
          },
        ]),

        mercury.db.Order?.mongoModel.aggregate([
          {
            $lookup: {
              from: "invoices",
              localField: "invoice",
              foreignField: "_id",
              as: "invoiceData",
            },
          },
          {
            $unwind: "$invoiceData",
          },
          {
            $match: {
              "invoiceData.couponApplied": { $exists: true },
            },
          },
          {
            $lookup: {
              from: "coupons",
              localField: "invoiceData.couponApplied",
              foreignField: "_id",
              as: "coupon",
            },
          },
          {
            $unwind: "$coupon",
          },
          {
            $group: {
              _id: "$invoiceData.couponApplied",
              couponCode: { $first: "$coupon.code" },
              usageCount: { $sum: 1 },
              totalDiscount: { $sum: "$invoiceData.discountedAmount" },
            },
          },
          {
            $sort: { usageCount: -1 },
          },
          {
            $project: {
              _id: 0,
            },
          },
        ]),
        mercury.db.Inventory?.mongoModel.aggregate([
          {
            $match: {
              totalQuantity: { $lt: 10 },
              bookedQuantity: { $gt: 0 },
            },
          },
          {
            $lookup: {
              from: "products",
              localField: "product",
              foreignField: "_id",
              as: "productInfo",
            },
          },
          {
            $lookup: {
              from: "variants",
              localField: "variants",
              foreignField: "_id",
              as: "variants",
            },
          },
          {
            $project: {
              product: { $arrayElemAt: ["$productInfo.name", 0] },
              availableQuantity: "$totalQuantity",
              variants: { $first: "$variants.name" },
              _id: 0,
            },
          },
        ]),
        mercury.db.Order?.mongoModel.aggregate([
          {
            $lookup: {
              from: "invoices",
              localField: "invoice",
              foreignField: "_id",
              as: "invoiceInfo",
            },
          },
          {
            $lookup: {
              from: "customers",
              localField: "customer",
              foreignField: "_id",
              as: "customerInfo",
            },
          },
          {
            $lookup: {
              from: "payments",
              localField: "invoiceInfo.payment",
              foreignField: "_id",
              as: "paymentInfo",
            },
          },
          {
            $group: {
              _id: "$customer",
              customerDetails: {
                $first: { $arrayElemAt: ["$customerInfo", 0] },
              },
              totalOrders: { $sum: 1 },
              totalRevenue: {
                $sum: {
                  $toDouble: { $arrayElemAt: ["$paymentInfo.amount", 0] },
                },
              },
            },
          },
          {
            $sort: { totalRevenue: -1 },
          },
          {
            $limit: 6,
          },
          {
            $project: {
              _id: 0,
              totalOrders: 1,
              totalRevenue: 1,
              customerName: {
                $concat: [
                  "$customerDetails.firstName",
                  " ",
                  "$customerDetails.lastName",
                ],
              },
            },
          },
        ]),
      ]);

      return {
        orderRevenueInsights,
        orderShipmentStatusInsights,
        orderedProductVariantInsights,
        couponsInsights,
        inventoryInsights,
        customerInsights,
      };
    },
  },
};
