///admin/product/baseTrademark/{page}/{limit}
//这个模块主要获取的是品牌管理的数据的模块
import request from '@/utils/request'

export const reqTradeMarkList=(page,limit)=>request({url:`/dev1-api/admin/product/baseTrademark/${page}/${limit}`,method:'get'})

// 处理添加品牌
// 新增品牌：/admin/product/baseTrademark/save post 携带俩个参数：品牌名称，品牌logo
// 切记：对于新增的品牌，给服务器传递数据，不需要传递id。id是由服务器生成

// 修改品牌的
// 修改品牌
// /admin/product/baseTrademark/update post 携带三个参数：id,品牌名称，品牌logo
// 切记：对于修改某一个品牌的操作，前端携带的参数需要带上id,你需要告诉服务器修改的是哪一个品牌

export const reqAddOrUpdateTradeMark=(tradeMark)=>{
    // 带给服务器od--修改
    if(tradeMark.id){
        return request({url:'/dev1-api/admin/product/baseTrademark/update',method:'put',data:tradeMark})
    }else{
        return request({url:'/dev1-api/admin/product/baseTrademark/save',method:'post',data:tradeMark})
    }
}

// 删除品牌
export const reqDeleteTradeMark=(id)=>request({url:`/dev1-api/admin/product/baseTrademark/remove/${id}`,method:'delete'})