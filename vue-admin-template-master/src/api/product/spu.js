import request from '@/utils/request';

// 获取spu列表数据的接口
export const reqSpuList=(page,limit,category3Id)=>request({url:`/dev1-api/admin/product/${page}/${limit}`,method:'get',params:{category3Id}});

//获取SPU信息
///admin/product/getSpuById/{spuId}   get   
export const reqSpu = (spuId) => request({ url: `/dev1-api/admin/product/getSpuById/${spuId}`, method: 'get' });

//获取品牌的信息
///admin/product/baseTrademark/getTrademarkList  get
export const reqTradeMarkList = () => request({ url: `/dev1-api/admin/product/baseTrademark/getTrademarkList`, method: 'get' });

//获取SPU图标的接口
///admin/product/spuImageList/{spuId}  get
export const reqSpuImageList = (spuId) => request({ url: `/dev1-api/admin/product/spuImageList/${spuId}`, method: 'get' });

//获取平台全部销售属性----整个平台销售属性一共三个
//GET /admin/product/baseSaleAttrList  

export const reqBaseSaleAttrList = () => request({ url: '/dev1-api/admin/product/baseSaleAttrList', method: 'get' });

// 修改spu,保存spu 区别是否携带id
export const reqAddOrUpdateSpu = (spuInfo) =>{
    // 携带参数
    if(spuInfo.id){
        return request({ url: '/dev1-api/admin/product/updateSpuInfo', method: 'post',data:spuInfo });
    }else{
        // 添加spu
        return request({ url: '/dev1-api/admin/product/saveSpuInfo', method: 'post',data:spuInfo });
    }
}

// 删除spu
export const reqDeleteSpu = (spuId) => request({ url: `/dev1-api/admin/product/deleteSpu/${spuId}`, method: 'delete' });
//获取图片的数据
// export const reqSpuImageList = (spuId) => request({ url: `/dev1-api/admin/product/spuImageList/${spuId}`, method: 'get' });
// 获取销售数据的数据
export const reqSpuSaleAttrList = (spuId) => request({ url: `/dev1-api/admin/product/spuSaleAttrList/${spuId}`, method: 'get' });
// 获取平台的数据
export const reqAttrInfoList = (category1Id,category2Id,category3Id) => request({ url: `/dev1-api/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' });

// 添加sku
export const reqAddSku = (skuInfo) => request({ url: '/dev1-api/admin/product/saveSkuInfo', method: 'post',data:skuInfo });

