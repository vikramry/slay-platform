const typeDefs = `
  type Query {
    hello: String
    dashboardAnalytics(orderRevenueBy: timeFrame): DashboardAnalytics,
    ordersExport(startDate: DateTime!, endDate: DateTime!): JSON
  }

  type DashboardAnalytics {
    orderRevenueInsights: [OrderRevenueInsight]
    orderShipmentStatusInsights: [ShipmentStatusInsight]
    orderedProductVariantInsights: [ProductVariantInsight]
    couponsInsights: [CouponInsight]
    inventoryInsights: [InventoryInsight]
    customerInsights: [CustomerInsight]
  }

  enum timeFrame {
    MONTH
    YEAR
    DAY
  }

  type OrderRevenueInsight {
    dailyRevenue: Float
    orderCount: Int
    date: String
  }

  type ShipmentStatusInsight {
    status: String
    count: Int
  }

  type ProductVariantInsight {
    productName: String
    variantName: String
    totalQuantity: Int
    totalRevenue: Float
  }

  type CouponInsight {
    couponCode: String
    usageCount: Int
    totalDiscount: Float
  }

  type InventoryInsight {
    product: String
    availableQuantity: Int
  }

  type CustomerInsight {
    totalOrders: Int
    totalRevenue: Float
    customerName: String
  }
`;

export default typeDefs;