export interface InventoryType {
  inventoryId: number,
  rank: string,
  price: number,
  inventoryNum: number,
  createdAt?: string,
  updatedAt?: string
}

export interface ProductType {
  productId: number;
  title: string;
  note?: string;
  imageUrl?: string;
  inventories?: InventoryType[]
}

export interface listProductParams {
  product_ids: number[],
  titles: string | undefined,
  limit?: number | undefined,
  offset?: number | undefined,
  order_by?: {
    field: string,
    direction: 'asc' | 'desc'
  }
}

export interface CategoryType {
  categoryId: number;
  categoryName: string;
}

export interface RegisterProductParams {
  title: string;
  note: string| undefined;
  image_url: string | undefined;
  category_id: number;
}

export type ProductInventoryType = ProductType & InventoryType;


export type MergedProductType = ProductType & InventoryType & {
  inCartNum: number;
};

