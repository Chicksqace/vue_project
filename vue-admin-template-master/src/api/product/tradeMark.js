///admin/product/baseTrademark/{page}/{limit}
//这个模块主要获取的是品牌管理的数据的模块
import request from '@/utils/request'

export const reqTradeMarkList=(page,limit)=>request({url:`/dev1-api/admin/product/baseTrademark/${page}/${limit}`,method:'get'})