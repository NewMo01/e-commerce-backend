const ADMIN = "admin";
const CUSTOMER = "customer";
const MANAGER = "manager";

const PENDING = "pending";
const PAID = "paid";
const SHIPPED = "shipped";
const DELIVERED = "delivered";
const CANCELLED = "cancelled";

const STATUS = [PENDING, PAID, SHIPPED, DELIVERED, CANCELLED];

const ROLES = [ADMIN, CUSTOMER, MANAGER];

module.exports = {
  ADMIN,
  CUSTOMER,
  MANAGER,
  ROLES,
  PENDING,
  PAID,
  SHIPPED,
  DELIVERED,
  CANCELLED,
  STATUS
};
