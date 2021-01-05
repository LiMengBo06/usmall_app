import axios from "axios"
import qs from "qs"
import Vue from "Vue"
import {erroralert} from "./alert"
import store from "../store"
import router from "../router"
// 开发环境使用8080
let baseUrl ='/api'
Vue.prototype.$pre="http://localhost:3000"

// 生产环境使用打包
// let baseUrl =""
// Vue.prototype.$pre=""


// 请求拦截
axios.interceptors.request.use(config=>{
    if(config.url!==baseUrl+"/api/userlogin"){
        config.headers.authorization=store.state.userInfo.token
    }
     return config
})


// 响应拦截()
axios.interceptors.response.use(res=>{
  
    if(res.data.code!==200){
        erroralert(res.data.msg )
    }

    if(!res.data.list){
        res.data.list=[]
    }

    if(res.data.msg==="登录已过期或访问权限受限"){
        store.dispatch("changeUser",{})
        router.push("/login")
    }

    console.group("本次请求的地址是：" + res.config.url)
    console.log(res)
    console.groupEnd()

    return res

})

// 登录
export let reqLogin =(user)=>{
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(user)
    })
}

// 菜单管理。。。。。。。。。。。。。。。。

// 添加
export const reqMenuAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/menuadd",
        method:"post",
        data:qs.stringify(user)
    })

}

// 菜单列表
export const reqMenulist=()=>{
    return axios({
        url:baseUrl+"/api/menulist",
        params:{
            istree:true
        }
    })
}

// 删除
export const reqMenuDel=(obj)=>{
    return axios({
        url:baseUrl+"/api/menudelete",
        method:"post",
        data:qs.stringify(obj)
    })
}

// 编辑
export const reqMenuDetail=(obj)=>{
    return axios({
        url:baseUrl+"/api/menuinfo",
        method:"get",
        params:obj
    })
}

// 修改
export const reqMenuUpdate=(user)=>{
    return axios({
        url:baseUrl+"/api/menuedit",
        method:"post",
        data:qs.stringify(user)
    })
}

// 角色。。。。。。。。。。。。。。。。。。。。。。。。。

// 添加
export const reqRoleAdd = (user) =>{
    return axios({
        url:baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(user)
    })
}

//列表
export const reqRolelist = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
    })
}

// 详情
export const reqRoleDetail = (user) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: user
    })
}

// 修改
export const reqRoleUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(user)
    })
}

// 删除
export const reqRoleDel = (user) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify(user)
    })
}

// 管理员。。。。。。。。。。。。。。。。。。。。。。。。。

// post 带有文件，参数转换
function dataToFormData(user){
    let data=new FormData()
    for(let i in user){
        data.append(i,user[i])
    }
    return data
}

// 添加
export const reqmanageAdd = (user) =>{
    return axios({
        url:baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(user)
    })
}

//列表
export const reqmanagelist = (obj) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method:"get",
        params:obj
    })
}


//详情
export const reqmanageDetail = (user) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: user
    })
}

// 总数
export const reqmanageCount=()=>{
    return axios({
        url:baseUrl+"/api/usercount"
    })
}


// 修改
export const reqmanageUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data:qs.stringify(user)
    })
}

// 删除
export const reqmanageDel = (user) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify(user)
    })
}

// 商品分类管理。。。。。。。。。。。。。。。。。。。。。。。。

// 添加
export const reqcateAdd = (user) =>{
    return axios({
        url:baseUrl + "/api/cateadd",
        method: "post",
        data: dataToFormData(user)
    })
}

//列表
export const reqcatelist = (p) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method:"get",
        params:p
    })
}


//详情
export const reqcateDetail = (user) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: user
    })
}



// 修改
export const reqcateUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: dataToFormData(user)
    })
}

// 删除
export const reqcateDel = (id) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify(id)
    })
}

// 轮播图管理。。。。。。。。。。。。。。。。。。。。。。。。

// 添加
export const reqbannerAdd = (user) =>{
    return axios({
        url:baseUrl + "/api/banneradd",
        method: "post",
        data: dataToFormData(user)
    })
}

//列表
export const reqbannerlist = (p) => {
    return axios({
        url: baseUrl + "/api/bannerlist",
        method:"get",
        params:p
    })
}


//详情
export const reqbannerDetail = (user) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params: user
    })
}



// 修改
export const reqbannerUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: dataToFormData(user)
    })
}

// 删除
export const reqbannerDel = (id) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify(id)
    })
}


// 会员管理。。。。。。。。。。。。。。

//列表
export const reqmemberlist = () => {
    return axios({
        url: baseUrl + "/api/memberlist",
        method:"get"
    })
}

//详情
export const reqmemberDetail = (uid) => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        method: "get",
        params: uid
    })
}

// 修改
export const reqmemberUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: "post",
        data:qs.stringify(user)
    })
}

// 商品规格。。。。。。。。。。。。。。。。。。。。

// 添加
export const reqspecsAdd = (user) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data:qs.stringify(user)
    })
}

//列表
export const reqspecslist = (p) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method:"get",
        params:p
    })
}


//详情
export const reqspecsDetail = (user) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: user
    })
}



// 修改
export const reqspecsUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(user)
    })
}

// 删除
export const reqspecsDel = (id) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify(id)
    })
}

// 总数
export const reqspecsCount=()=>{
    return axios({
        url:baseUrl+"/api/specscount"
    })
}

// 商品管理。。。。。。。。。。。。。。。。。。。。
// 添加
export const reqgoodsAdd = (user) => {
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: dataToFormData(user)
    })
}

//列表
export const reqgoodslist = (p) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method:"get",
        params:p
    })
}


//详情
export const reqgoodsDetail = (user) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: user
    })
}



// 修改
export const reqgoodsUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: dataToFormData(user)
    })
}

// 删除
export const reqgoodsDel = (id) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify(id)
    })
}

// 总数
export const reqgoodsCount=()=>{
    return axios({
        url:baseUrl+"/api/goodscount"
    })
}

// 限时秒杀

// 添加
export const reqseckAdd = (user) =>{
    return axios({
        url:baseUrl + "/api/seckadd",
        method: "post",
        data: qs.stringify(user)
    })
}

//列表
export const reqsecklist = () => {
    return axios({
        url: baseUrl + "/api/secklist",
    })
}

// 详情
export const reqseckDetail = (id) => {
    return axios({
        url: baseUrl + "/api/seckinfo",
        method: "get",
        params: id
    })
}

// 修改
export const reqseckUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/seckedit",
        method: "post",
        data: qs.stringify(user)
    })
}

// 删除
export const reqseckDel = (id) => {
    return axios({
        url: baseUrl + "/api/seckdelete",
        method: "post",
        data: qs.stringify(id)
    })
}