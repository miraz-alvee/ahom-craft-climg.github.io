// ======================================================
// TOOL CATEGORY
// ======================================================

export interface ToolCategory {
  id: number;
  name: string;
  description: string;
  image: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}


// ======================================================
// TOOL IMAGE
// ======================================================

export interface ToolImage {
  id?: number;
  image?: string | null;
  is_primary?: boolean;
  is_active?: boolean;
}


// ======================================================
// TOOL
// ======================================================

export interface Tool {
  tools_id: number;
  name: string;
  description: string;
  category: string;
  images: ToolImage[];
  regular_price: string;
  discount_price: string;
  discount_percentage: string;
  stock_quantity: number;
  total_reviews: number;
  purchased_tools_user: boolean;
  average_rating: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}


// ======================================================
// TOOLS RESPONSE
// ======================================================

export interface ToolsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Tool[];
}


// ======================================================
// CART TOOL
// ======================================================

export interface CartTool {
  id: number;
  name: string;
  image: string | null;
  regular_price: number;
  discount_price: number;
}


// ======================================================
// CART ITEM
// ======================================================

export interface CartItem {
  cart_item_id: number;
  user: string;
  tool: CartTool;
  quantity: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  total_price: number;
}


// ======================================================
// CART RESPONSE
// ======================================================

export interface CartItemsResponse {
  cart_items: CartItem[];
  total_amount: number;
}


// ======================================================
// ADD CART REQUEST
// ======================================================

export interface AddCartItemRequest {
  tool: number;
  quantity: number;
  is_active: boolean;
}


// ======================================================
// ADD CART RESPONSE
// ======================================================

export interface AddCartItemResponse {
  message: string;
  cart_item: CartItem;
}

/* =========================
   Types / Interfaces
========================= */

export interface ShippingAddress {
    id: number;
    user: string;
    address: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
}

export interface CreateShippingAddressRequest {
    address: string;
    phone_number: string;
}

export interface UpdateShippingAddressRequest {
    address?: string;
    phone_number?: string;
}

/* =========================
   Types / Interfaces
========================= */

export interface OrderShippingAddress {
    shipping_address_id: number;
    address: string;
    phone_number: string;
}

export interface OrderUser {
    user_id: number;
    user_full_name: string;
    user_email: string;
    user_phone_number: string | null;
}

export interface OrderItem {
    order_item_id: number;
    tool_id: number;
    tool_name: string;
    quantity: number;
    amount: number;
    quantity_total_price: number;
}

export interface ToolOrder {
    order_id: number;

    shipping_address: number;

    shipping_address_details: OrderShippingAddress;

    user: OrderUser;

    order_items: OrderItem[];

    total_amount: string;

    delivery_charge: string;

    total_amount_with_delivery: string;

    status: string;

    payment_status: string;

    payment_method: string;

    created_at: string;

    updated_at: string;
}

/* =========================
   CREATE ORDER REQUEST
========================= */

export interface CreateOrderRequest {
    shipping_address: number;
    delivery_charge: string;
}

/* =========================
   API
========================= */
