import request from '@/utils/request';

// 获取sku列表数据的接口
export const reqSkuList=(page,limit)=>request({url:`/dev1-api/admin/product/list/${page}/${limit}`,method:'get'});

// 上架
export const reqSale=(skuId)=>request({url:`/dev1-api/admin/product/onSale/${skuId}`,method:'get'});

// 下架
export const reqCancel=(skuId)=>request({url:`/dev1-api/admin/product/cancelSale/${skuId}`,method:'get'});

// sku详情
export const reqSkuById=(skuId)=>request({url:`/dev1-api/admin/product/getSkuById/${skuId}`,method:'get'});

