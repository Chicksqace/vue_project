import request from '@/utils/request';

// 获取一级
export const reqCategory1List=()=>request({url:'/dev1-api/admin/product/getCategory1',method:'get'})

// 获取二级
export const reqCategory2List=(category1Id)=>request({url:`/dev1-api/admin/product/getCategory2/${category1Id}`,method:'get'})
// export function reqCategory2List(){return request({url:'/admin/product/getCategory2',method:'get'})}


// 获取三级
export const reqCategory3List=(category2Id)=>request({url:`/dev1-api/admin/product/getCategory3/${category2Id}`,method:'get'})

// 获取平台属性接口
export const reqAttrList=(category1Id,category2Id,category3Id)=>request({url:`/dev1-api/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})

// 获取属性与属性值
export const reqAddAttr=data=>request({url:`/dev1-api//admin/product/saveAttrInfo`,method:'post',data})

 