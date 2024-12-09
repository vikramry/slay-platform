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
              variantName: { $first: "$variants.name" },
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
    ordersExport: async (root:any, {startDate, endDate}: {startDate: string, endDate: string}, ctx: any) => {
      const orders = await mercury.db.Order?.mongoModel.aggregate([
        {
          $match: {
            date: {
              $gte: new Date(startDate),
              $lte: new Date(endDate)
            }
          }
        },
        {
          $lookup: {
            from: "invoices",
            localField: "invoice",
            foreignField: "_id",
            as: "invoice"
          }
        },
        {
          $unwind: "$invoice"
        },
        {
          $lookup: {
            from: "customers",
            localField: "customer",
            foreignField: "_id",
            as: "customer"
          }
        },
        {
          $unwind: "$customer"
        },
        {
          $lookup: {
            from: "payments",
            localField: "invoice.payment",
            foreignField: "_id",
            as: "payment"
          }
        },
        {
          $unwind: "$payment"
        },
        {
          $lookup: {
            from: "addresses",
            localField: "invoice.billingAddress",
            foreignField: "_id",
            as: "billingAddress"
          }
        },
        {
          $unwind: "$billingAddress"
        },
        {
          $lookup: {
            from: "addresses",
            localField: "invoice.shippingAddress",
            foreignField: "_id",
            as: "shippingAddress"
          }
        },
        {
          $unwind: "$shippingAddress"
        },
        {
          $lookup: {
            from: "coupons",
            localField: "invoice.couponApplied",
            foreignField: "_id",
            as: "coupon"
          }
        },
        {
          $lookup: {
            from: "invoicelines",
            localField: "invoice._id",
            foreignField: "invoice",
            as: "orderItems",
            pipeline: [
              {
                $lookup: {
                  from: "productitems",
                  localField: "productItem",
                  foreignField: "_id",
                  as: "productItem"
                }
              },
              {
                $unwind: "$productItem"
              },
              {
                $lookup: {
                  from: "variants",
                  localField: "variants",
                  foreignField: "_id",
                  as: "variants"
                }
              }
            ]
          }
        },
        {
          $unwind: "$orderItems"
        },
        {
          $project: {
            _id: 0,
            orderId: 1,
            name: {$concat:["$customer.firstName", " ", "$customer.lastName"]},
            email: "$customer.email",
            mobileNumber: "$customer.mobile",
            shipmentStatus: 1,
            date: 1,
            billingName: "$billingAddress.name",
            billingAddressLine:
              "$billingAddress.addressLine1",
            billingCity: "$billingAddress.city",
            billingCountry: "$billingAddress.country",
            billingZipcode: "$billingAddress.zipCode",
            billingState: "$billingAddress.state",
            billingMobileNumber:
              "$billingAddress.mobile",
            shippingName: "shippingName.name",
            shippingAddressLine:
              "$shippingAddress.addressLine1",
            shippingCity: "$shippingAddress.city",
            shippingCountry: "$shippingAddress.country",
            shippingZipcode: "$shippingAddress.zipCode",
            shippingState: "$shippingAddress.state",
            shippingMobileNumber:
              "$shippingAddress.mobile",
            couponApplied: {
              $arrayElemAt: ["$coupon.code", 0]
            },
            productName: "$orderItems.productItem.name",
            productDescription:
              "$orderItems.productItem.description",
            quantity: "$orderItems.quantity",
            costPerUnit: "$orderItems.pricePerUnit",
            varaint: {$arrayElemAt: ["$orderItems.variants.name", 0]},
            totalCost: {
              $subtract: [
                "$invoice.totalAmount",
                "$invoice.discountedAmount"
              ]
            }
          }
        }
      ])
      let columns = [
        { id: 'orderId', displayName: 'Order ID' },
        { id: 'date', displayName: 'Order Date' },
        { id: 'shipmentStatus', displayName: 'Shipment Status' },
        { id: 'name', displayName: 'Customer Name' },
        { id: 'email', displayName: 'Email Address' },
        { id: 'mobileNumber', displayName: 'Mobile Number' },
        { id: 'billingName', displayName: 'Billing Name' },
        { id: 'billingAddressLine', displayName: 'Billing Address Line' },
        { id: 'billingCity', displayName: 'Billing City' },
        { id: 'billingCountry', displayName: 'Billing Country' },
        { id: 'billingZipcode', displayName: 'Billing Zip Code' },
        { id: 'billingState', displayName: 'Billing State' },
        { id: 'billingMobileNumber', displayName: 'Billing Mobile Number' },
        { id: 'shippingName', displayName: 'Shipping Name' },
        { id: 'shippingAddressLine', displayName: 'Shipping Address Line' },
        { id: 'shippingCity', displayName: 'Shipping City' },
        { id: 'shippingCountry', displayName: 'Shipping Country' },
        { id: 'shippingZipcode', displayName: 'Shipping Zip Code' },
        { id: 'shippingState', displayName: 'Shipping State' },
        { id: 'shippingMobileNumber', displayName: 'Shipping Mobile Number' },
        { id: 'productName', displayName: 'Product Name' },
        { id: 'productDescription', displayName: 'Product Description' },
        { id: 'quantity', displayName: 'Quantity' },
        { id: 'costPerUnit', displayName: 'Cost Per Unit' },
        { id: 'varaint', displayName: 'Variants' },
        { id: 'totalCost', displayName: 'Total Cost' }
      ];
      
      return {
        orders, 
        columns
      }
    }
  },
};
