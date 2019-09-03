!function(e){var t={};function a(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=14)}([function(e,t,a){"use strict";e.exports={MONGODB:{uri:"mongodb://127.0.0.1:27017/blogapi",prouri:"mongodb://127.0.0.1:27017/blogapi"},QINIU:{accessKey:"your_qn_accessKey",secretKey:"your_qn_secretKey",bucket:"naice",origin:"xxxxxx",uploadURL:"your_qn_uploadURL"},User:{jwtTokenSecret:"naice_blog",defaultUsername:"naice",defaultPassword:"123456"},EMAIL:{service:"QQ",account:"370215230@qq.com",password:"xxxxxxx"},BAIDU:{site:"blog.naice.me",token:"xxxxxxx"},APP:{ROOT_PATH:"/api",LIMIT:10,PORT:3009},INFO:{name:"by_blog",version:"1.0.0",author:"naice",site:"https://blog.naice.me",powered:["Vue2","Nuxt.js","Node.js","MongoDB","koa","Nginx"]}}},function(e,t){e.exports=require("mongoose")},function(e,t){e.exports={resError:({ctx:e,message:t="请求失败",err:a=null})=>{e.body={code:0,message:t,debug:a}},resSuccess:({ctx:e,message:t="请求成功",result:a=null})=>{e.body={code:1,message:t,result:a}}}},function(e,t,a){"use strict";e.exports=e=>async(t,a)=>{const{body:n}=t.request;if(e&&e.length>0){let a=[];for(let t=0;t<e.length;t++){let r=e[t];n.hasOwnProperty(r)||a.push(r)}a.length>0&&t.throw(412,`${a.join(", ")} 参数缺失`)}await a()}},function(e,t){e.exports=require("mongoose-paginate")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("crypto")},function(e,t,a){"use strict";const n=a(1),r=a(4),s=new n.Schema({title:{type:String,required:!0},keyword:{type:String,required:!0},descript:{type:String,required:!0},tag:[{type:n.Schema.Types.ObjectId,ref:"Tag"}],content:{type:String,required:!0},editContent:{type:String,required:!0},state:{type:Number,default:1},publish:{type:Number,default:1},thumb:String,type:{type:Number,default:1},create_at:{type:Date,default:Date.now},update_at:{type:Date,default:Date.now},meta:{views:{type:Number,default:0},likes:{type:Number,default:0},comments:{type:Number,default:0}}});s.plugin(r),s.pre("findOneAndUpdate",function(e){this.findOneAndUpdate({},{update_at:Date.now()}),e()});const i=n.model("Article",s);e.exports=i},function(e,t){e.exports=require("xss")},function(e,t){e.exports=require("geoip-lite")},function(e,t,a){const n=a(1),r=a(6),s=a(0),i=new n.Schema({name:{type:String,default:"naice"},username:{type:String,default:s.User.defaultUsername},slogan:{type:String,default:""},gravatar:{type:String,default:""},password:{type:String,default:r.createHash("md5").update(s.User.defaultPassword).digest("hex")},role:{type:Number,default:1}}),o=n.model("User",i);e.exports=o},function(e,t){e.exports=require("jsonwebtoken")},function(e,t,a){"use strict";const n=a(1),r=a(4),s=new n.Schema({post_id:{type:String,required:!0},pid:{type:Number,default:0},content:{type:String,required:!0,validate:/\S+/},likes:{type:Number,default:0},ip:{type:String},city:{type:String},range:{type:String},country:{type:String},agent:{type:String,validate:/\S+/},author:{gravatar:{type:String,default:0},name:{type:String,required:!0,validate:/\S+/},email:{type:String,required:!0,validate:/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/},site:{type:String}},state:{type:Number,default:1},reply:{type:Number,default:0},create_at:{type:Date,default:Date.now},update_at:{type:Date,default:Date.now}});s.plugin(r),s.pre("findOneAndUpdate",function(e){this.findOneAndUpdate({},{update_at:Date.now()}),e()});const i=n.model("Comment",s);e.exports=i},function(e,t,a){"use strict";const n=a(0),r=a(35);let s=!1;const i=r.createTransport({service:n.EMAIL.service,secure:!0,secureConnection:!0,port:465,auth:{user:n.EMAIL.account,pass:n.EMAIL.password}});i.verify((e,t)=>{e?(s=!1,console.warn("邮件客户端初始化连接失败，请检查代码")):(s=!0,console.log("邮件客户端初始化连接成功，随时可发送邮件"))});e.exports={sendMail:e=>{if(!s)return console.warn("由于未初始化成功，邮件客户端发送被拒绝"),!1;e.from='"何文林" <370215230@qq.com>',i.sendMail(e,(e,t)=>{if(e)return console.warn("邮件发送失败",e);console.log("邮件发送成功",t.messageId,t.response)})},nodemailer:r,transporter:i}},function(e,t,a){"use strict";const n=a(15),r=a(0),s=a(16),i=a(20),o=a(26),c=new n;s(),i(c),c.use(o.routes()),c.use(o.allowedMethods()),c.listen(r.APP.PORT,()=>{console.log(`node-Koa Run！port at ${r.APP.PORT}`)})},function(e,t){e.exports=require("koa")},function(e,t,a){"use strict";(function(t){const n=a(17),r=a(1),s=a(4),{resolve:i}=a(5),o=a(0),c=a(18),u=o.MONGODB.uri;r.Promise=global.Promise,r.set("debug",!0),n.sync(i(t,"../models/*.js")).forEach(a(19)),e.exports=function(){return r.connect(u),r.connection.on("error",e=>{console.log("数据库连接失败!",e)}),r.connection.once("open",()=>{console.log("数据库连接成功!"),s.paginate.options={limit:o.APP.LIMIT},c()}),r}}).call(this,"/")},function(e,t){e.exports=require("glob")},function(e,t,a){"use strict";const n=a(6),r=a(0),s=a(10);e.exports=async()=>{const e=r.User.defaultUsername,t=(e=>n.createHash("md5").update(e).digest("hex"))(r.User.defaultPassword);let a=await s.find({}).exec().catch(e=>{console.log(500,"服务器内部错误-查找admin错误！")});if(console.log(a),0===a.length){let a=new s({username:e,password:t,role:100});await a.save().catch(e=>{console.log(500,"服务器内部错误-存储admin错误！")})}}},function(e,t){function a(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}a.keys=function(){return[]},a.resolve=a,e.exports=a,a.id=19},function(e,t,a){"use strict";const n=a(21),r=a(22),s=a(23);a(24);e.exports=e=>{e.use(async(e,t)=>{const a=new Date;await t();const n=new Date-a;console.log(`${e.method} ${e.url} - ${n}ms`)}),e.use(s({origin:!0})),e.use(r()),e.use(n({jsoinLimit:"10mb",formLimit:"10mb",textLimit:"10mb"})),e.use(async(e,t)=>{try{await t()}catch(t){e.body={error:t}}404!==e.status&&405!==e.status||(e.body={code:0,message:"无效的api请求"})})}},function(e,t){e.exports=require("koa-bodyparser")},function(e,t){e.exports=require("koa-helmet")},function(e,t){e.exports=require("koa-cors")},function(e,t,a){"use strict";const n=a(25);e.exports=async(e,t)=>{const a=e.request.headers.origin||"";if((["https://blog.naice.me","https://blog.admin.naice.me","file://"].includes(a)||a.includes("localhost"))&&e.set("Access-Control-Allow-Origin",a),e.set({"Access-Control-Allow-Headers":"Authorization, Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With","Access-Control-Allow-Methods":"PUT,PATCH,POST,GET,DELETE,OPTIONS","Access-Control-Max-Age":"1728000","Content-Type":"application/json;charset=utf-8","X-Powered-By":"naice_blog 1.0.0"}),"OPTIONS"==e.request.method)return e.status=200,!1;if(Object.is("development","production")){const{origin:t,referer:a}=e.request.headers;if("file://"!==t){if(!((!t||t.includes("naice.me"))&&(!a||a.includes("naice.me"))))return e.throw(403,{code:0,message:"身份验证失败！"}),!1}}const r=e.request.url.indexOf("/article/like")>=0&&Object.is(e.request.method,"POST"),s=e.request.url.indexOf("/comment/like")>=0&&Object.is(e.request.method,"POST"),i=e.request.url.indexOf("/user/login")>=0&&Object.is(e.request.method,"POST"),o=Object.is(e.request.url,"/api/hero/add")&&Object.is(e.request.method,"PUT"),c=Object.is(e.request.url,"/api/comment/add")&&Object.is(e.request.method,"PUT"),u=Object.is(e.request.url,"/api/reply/add")&&Object.is(e.request.method,"PUT");return r||s||c||i||o||u?(await t(),!1):n(e.request)||Object.is(e.request.method,"GET")?void await t():(e.throw(401,{code:-2,message:"身份验证失败！"}),!1)}},function(e,t,a){"use strict";const n=a(0),r=a(11);e.exports=e=>{const t=(e=>{if(e.headers&&e.headers.authorization){const t=e.headers.authorization.split(" ");if(Object.is(t.length,2)&&Object.is(t[0],"Naice"))return t[1]}return!1})(e);if(t)try{if(r.verify(t,n.User.jwtTokenSecret).exp>Math.floor(Date.now()/1e3))return!0}catch(e){console.log(e)}return!1}},function(e,t,a){const n=a(27),r=a(28),s=a(31),i=a(33),o=a(36),c=a(39),u=a(46),d=a(48),l=a(51),p=new n;s(p),r(p),i(p),o(p),c(p),u(p),d(p),l(p),e.exports=p},function(e,t){e.exports=require("koa-router")},function(e,t,a){"use strict";const n=a(0),{putTag:r,getTags:s,editTag:i,deleteTag:o}=a(29),{resError:c,resSuccess:u}=a(2),d=a(3),l=e=>`${n.APP.ROOT_PATH}/tag/${e}`;e.exports=function(e){e.put(l("add"),d(["name"]),async e=>{const{name:t,descript:a=""}=e.request.body;try{const n=await r({name:t,descript:a});u({ctx:e,message:"添加标签成功",result:n})}catch(t){c({ctx:e,message:"添加标签失败",err:t.message})}}),e.get(l("get"),async e=>{try{let t=await s();u({ctx:e,message:"获取标签成功",result:t})}catch(t){c({ctx:e,message:"获取标签失败",err:t})}}),e.del(l("delect/:id"),async e=>{const{id:t}=e.params;if(t)try{await o(t),u({ctx:e,message:"删除标签成功"})}catch(t){c({ctx:e,message:"删除标签失败",err:t})}else c({ctx:e,message:"删除标签失败",err:"缺少参数id"})}),e.post(l("edit"),d(["_id","name"]),async e=>{try{await i(e.request.body);u({ctx:e,message:"修改标签成功"})}catch(t){c({ctx:e,message:"修改标签失败",err:t})}})}},function(e,t,a){"use strict";const n=a(30),r=a(7);e.exports={putTag:async e=>{const{name:t}=e,a=await n.find({name:t});if(a&&0!==a.length)throw new Error("标签名已经存在");return(await new n(e)).save()},getTags:async(e={})=>{const{current_page:t=1,page_size:a=50,keyword:s=""}=e,i={sort:{sort:1},page:Number(t),limit:Number(a)};let o={};s&&(o.name=new RegExp(s));let c=[];const u=await n.paginate(o,i);if(u){let e=JSON.parse(JSON.stringify(u)),t={};const a=await r.aggregate([{$match:t},{$unwind:"$tag"},{$group:{_id:"$tag",num_tutorial:{$sum:1}}}]);a&&(e.docs.forEach(e=>{const t=a.find(t=>String(t._id)===String(e._id));e.count=t?t.num_tutorial:0}),c={pagination:{total:e.total,current_page:e.page,total_page:e.pages,page_size:e.limit},list:e.docs})}return c},editTag:async e=>{const{_id:t,name:a,descript:r}=e;return await n.findByIdAndUpdate(t,{name:a,descript:r},{new:!0})},deleteTag:async e=>await n.findByIdAndRemove(e)}},function(e,t,a){"use strict";const n=a(1),r=a(4),s=new n.Schema({name:{type:String,required:!0,validate:/\S+/},descript:String,create_at:{type:Date,default:Date.now},update_at:{type:Date},sort:{type:Number,default:0}});s.plugin(r),s.pre("findOneAndUpdate",function(e){this.findOneAndUpdate({},{update_at:Date.now()}),e()}),e.exports=n.model("Tag",s)},function(e,t,a){"use strict";const n=a(0),{putArticle:r,delectArticle:s,editeArticle:i,getArticleById:o,getArticles:c,changeArticleStatus:u,getAllArticles:d,likeArticle:l}=a(32),{resError:p,resSuccess:g}=a(2),m=a(3),y=e=>`${n.APP.ROOT_PATH}/article/${e}`;e.exports=function(e){e.put(y("add"),m(["title","tag","content",'"editContent"',"keyword","descript"]),async function(e,t){const a=e.request.body;await r(a),g({ctx:e,message:"添加文章成功"})}),e.get(y("get"),async function(e,t){const a=e.query||{},n=await c(a);g({ctx:e,message:"查询文章成功",result:n})}),e.get(y("get/:id"),async function(e,t){const{id:a}=e.params;if(a)try{const t=await o(a);g({ctx:e,message:"查询文章成功",result:t})}catch(t){p({ctx:e,message:"查询文章失败",err:t})}else p({ctx:e,message:"查询文章失败",err:"缺少参数id"})}),e.del(y("delect/:id"),async function(e,t){const{id:a}=e.params;if(a)try{await s(a);g({ctx:e,message:"删除文章成功"})}catch(t){p({ctx:e,message:"删除文章失败",err:t})}else p({ctx:e,message:"删除文章失败",err:"缺少参数id"})}),e.post(y("edite/:id"),async function(e,t){const{id:a}=e.params;if(a)try{await i(a,e.request.body);g({ctx:e,message:"修改文章成功"})}catch(t){p({ctx:e,message:"修改文章失败",err:t})}else p({ctx:e,message:"修改文章失败",err:"地址缺少参数id"})}),e.get(y("getAll"),async function(e,t){const a=await d();g({ctx:e,message:"获取文章成功",result:a})}),e.post(y("status/:id"),async function(e,t){const{id:a}=e.params;if(a)try{await u(a,e.request.body);g({ctx:e,message:"修改文章状态成功"})}catch(t){p({ctx:e,message:"修改文章状态失败",err:t})}else p({ctx:e,message:"修改文章状态失败",err:"地址缺少参数id"})}),e.post(y("like/:id"),async function(e,t){const{id:a}=e.params;if(a)try{await l(a),g({ctx:e,message:"修改成功"})}catch(t){p({ctx:e,message:"修改失败",err:t})}else p({ctx:e,message:"修改失败",err:"地址缺少参数id"})})}},function(e,t,a){"use strict";const n=a(7);e.exports={putArticle:async e=>{let t=null;return e&&(t=await new n(e).save()),t},delectArticle:async e=>await n.findByIdAndRemove(e),editeArticle:async(e,t)=>await n.findByIdAndUpdate(e,t),getArticleById:async e=>{let t=await n.findById(e).populate("tag");return t&&(t.meta.views+=1,t=await t.save()),t},getArticles:async e=>{const{current_page:t=1,page_size:a=10,keyword:r="",state:s=1,publish:i=1,tag:o,type:c,date:u,hot:d}=e,l={sort:{create_at:-1},page:Number(t),limit:Number(a),populate:["tag"],select:"-content"},p={};if(r){const e=new RegExp(r);p.$or=[{title:e},{content:e},{description:e}]}if(["1","2"].includes(s)&&(p.state=s),["1","2"].includes(i)&&(p.publish=i),["1","2","3"].includes(c)&&(p.type=c),d&&(l.sort={"meta.views":-1,"meta.likes":-1,"meta.comments":-1}),u){const e=new Date(u);Object.is(e.toString(),"Invalid Date")||(p.create_at={$gte:new Date(1e3*(e/1e3-28800)),$lt:new Date(1e3*(e/1e3+57600))})}o&&(p.tag=o);const g=await n.paginate(p,l);return!!g&&{pagination:{total:g.total,current_page:g.page,total_page:g.pages,page_size:g.limit},list:g.docs}},changeArticleStatus:async(e,t)=>{const{state:a,publish:r}=t,s={};return a&&(s.state=a),r&&(s.publish=r),await n.findByIdAndUpdate(e,s)},likeArticle:async e=>{let t=await n.findById(e);return t&&(t.meta.likes+=1,t=await t.save()),t},getAllArticles:async()=>{Number(1),Number(1e4);const e=await n.aggregate([{$match:{state:1,publish:1}},{$project:{year:{$year:"$create_at"},month:{$month:"$create_at"},title:1,create_at:1}},{$group:{_id:{year:"$year",month:"$month"},article:{$push:{title:"$title",_id:"$_id",create_at:"$create_at"}}}}]);if(e){return[...new Set(e.map(e=>e._id.year))].map(t=>{let a=[];return e.forEach(e=>{e._id.year===t&&a.push({month:e._id.month,articleList:e.article.reverse()})}),{year:t,monthList:a}})}return[]}}},function(e,t,a){"use strict";const n=a(8),r=a(0),{putComment:s,delectComment:i,editeComment:o,getComment:c,likeComment:u}=a(34),{resError:d,resSuccess:l}=a(2),{sendMail:p}=a(13),g=a(3),m=`${r.APP.ROOT_PATH}/comment/`,y=e=>`${m}${e}`,f=e=>{p({to:`hewenlin1991@gmail.com, ${e.author.email}`,subject:"博客有新的留言",text:`来自 ${e.author.name} 的留言：${e.content}`,html:`<p> 来自 ${e.author.name} 的留言：${e.content}</p><br><a href="${e.permalink}" target="_blank">[ 点击查看 ]</a>`})};e.exports=function(e){e.put(y("add"),g(["post_id","content","author"]),async function(e,t){let a=e.request.body;a.content=n(a.content);try{let t=await s(e,a);f(t),l({ctx:e,message:"添加评论成功"})}catch(t){d({ctx:e,message:"添加评论失败",err:t})}}),e.get(y("get"),async function(e,t){try{const t=await c(e.query);l({ctx:e,message:"获取评论成功",result:t})}catch(t){d({ctx:e,message:"获取评论失败",err:t})}}),e.del(y("delect/:id"),async function(e,t){const{id:a}=e.params;if(a)try{await i(a),l({ctx:e,message:"删除评论成功"})}catch(t){d({ctx:e,message:"删除评论失败",err:t})}else d({ctx:e,message:"删除评论失败",err:"缺少参数id"})}),e.post(y("edite/:id"),async function(e,t){const{id:a}=e.params;if(a)try{await o(a,e.request.body),l({ctx:e,message:"修改评论成功"})}catch(t){d({ctx:e,message:"修改评论失败",err:t})}else d({ctx:e,message:"修改评论失败",err:"地址缺少参数id"})}),e.post(y("like/:id"),async function(e,t){const{id:a}=e.params;if(a)try{await u(a);l({ctx:e,message:"修改成功"})}catch(t){d({ctx:e,message:"修改失败",err:t})}else d({ctx:e,message:"修改失败",err:"地址缺少参数id"})})}},function(e,t,a){"use strict";const n=a(7),r=a(12),s=a(9);e.exports={putComment:async(e,t)=>{const a=(e.req.headers["x-forwarded-for"]||e.req.headers["x-real-ip"]||e.req.connection.remoteAddress||e.req.socket.remoteAddress||e.req.connection.socket.remoteAddress||e.req.ip||e.req.ips[0]).replace("::ffff:","");t.ip=a||"14.215.177.38",t.agent=e.headers["user-agent"]||t.agent;const i=s.lookup(t.ip);i&&(t.city=i.city,t.range=i.range,t.country=i.country);let o="https://blog.naice.me/about",c=await n.findById({_id:t.post_id});c.meta.comments+=1,o=`https://blog.naice.me/article/${c._id}`;const u=await new r(t).save();return await c.save(),u.permalink=o,u},delectComment:async e=>await r.findByIdAndRemove(e),editeComment:async(e,t)=>await r.findByIdAndUpdate(e,t),likeComment:async e=>{let t=await r.findById(e);return t&&(t.likes+=1,t=await t.save()),t},getComment:async(e={})=>{let{sort:t=-1,current_page:a=1,page_size:n=10,keyword:s="",post_id:i,state:o}=e,c={};const u={sort:{_id:t=Number(t)},page:Number(a),limit:Number(n)};[1,-1].includes(t)?u.sort={_id:t}:Object.is(t,2)&&(u.sort={likes:-1});let d={};if(o&&["0","1","2"].includes(o)&&(d.state=o),s){const e=new RegExp(s);d.$or=[{content:e},{"author.name":e},{"author.email":e}]}Object.is(i,void 0)||(d.post_id=i);const l=await r.paginate(d,u);return l&&(c={pagination:{total:l.total,current_page:u.page,total_page:l.pages,per_page:u.limit},data:l.docs}),c}}},function(e,t){e.exports=require("nodemailer")},function(e,t,a){"use strict";const n=a(8),r=a(0),{putHero:s,delectHero:i,editeHero:o,getHero:c}=a(37),{resError:u,resSuccess:d}=a(2),l=a(3),p=`${r.APP.ROOT_PATH}/hero/`,g=e=>`${p}${e}`;e.exports=function(e){e.put(g("add"),l(["content","author"]),async function(e,t){let a=e.request.body;a.content=n(a.content);try{await s(e,a);d({ctx:e,message:"添加留言成功"})}catch(t){u({ctx:e,message:"添加留言失败",err:t})}}),e.get(g("get"),async function(e,t){try{const t=await c(e.query);d({ctx:e,message:"获取留言成功",result:t})}catch(t){u({ctx:e,message:"获取留言失败",err:t})}}),e.del(g("delect/:id"),async function(e,t){const{id:a}=e.params;if(a)try{await i(a);d({ctx:e,message:"删除留言成功"})}catch(t){u({ctx:e,message:"删除留言失败",err:t})}else u({ctx:e,message:"删除留言失败",err:"缺少参数id"})}),e.post(g("edite/:id"),async function(e,t){const{id:a}=e.params;if(a)try{await o(a,e.request.body);d({ctx:e,message:"修改留言成功"})}catch(t){u({ctx:e,message:"修改留言失败",err:t})}else u({ctx:e,message:"修改留言失败",err:"地址缺少参数id"})})}},function(e,t,a){"use strict";const n=a(9),r=a(38);e.exports={putHero:async(e,t)=>{const a=(e.req.headers["x-forwarded-for"]||e.req.headers["x-real-ip"]||e.req.connection.remoteAddress||e.req.socket.remoteAddress||e.req.connection.socket.remoteAddress||e.req.ip||e.req.ips[0]).replace("::ffff:","");t.ip=a||"14.215.177.38",t.agent=e.headers["user-agent"]||t.agent;const s=n.lookup(t.ip);return s&&(t.city=s.city,t.range=s.range,t.country=s.country),await new r(t).save()},delectHero:async e=>await r.findByIdAndRemove(e),editeHero:async(e,t)=>await r.findByIdAndUpdate(e,t),getHero:async(e={})=>{let{current_page:t=1,page_size:a=12,keyword:n="",state:s=1}=e,i={};const o={sort:{_id:-1},page:Number(t),limit:Number(a)},c={};return n&&(c.name=new RegExp(n)),["0","1","2"].includes(s)&&(c.state=Number(s)),i=(i=await r.paginate(c,o))?{pagination:{total:i.total,current_page:i.page,total_page:i.pages,page_size:i.limit},list:i.docs}:{}}}},function(e,t,a){"use strict";const n=a(1),r=a(4),s=new n.Schema({name:{type:String},content:{type:String,required:!0,validate:/\S+/},author:{gravatar:{type:String,default:0},name:{type:String,required:!0,validate:/\S+/},email:{type:String,required:!0,validate:/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/},site:{type:String}},state:{type:Number,default:1},ip:{type:String},city:{type:String},range:{type:String},country:{type:String},agent:{type:String,validate:/\S+/},create_time:{type:Date,default:Date.now}});s.plugin(r),e.exports=n.model("Hero",s)},function(e,t,a){"use strict";const n=a(0),{putMusic:r,delectMusic:s,editeMusic:i,getMusic:o,upload:c}=a(40),{resError:u,resSuccess:d}=a(2),l=a(3),p=`${n.APP.ROOT_PATH}/music/`,g=e=>`${p}${e}`;e.exports=function(e){e.put(g("add"),l(["title","name","url","lyrics"]),async function(e,t){let a=e.request.body;try{await r(e,a),d({ctx:e,message:"添加音乐成功"})}catch(t){u({ctx:e,message:"添加音乐失败",err:t})}}),e.get(g("get"),async function(e,t){try{const t=await o(e.query);d({ctx:e,message:"获取音乐成功",result:t})}catch(t){u({ctx:e,message:"获取音乐失败",err:t})}}),e.del(g("delect/:id"),async function(e,t){const{id:a}=e.params;if(a)try{await s(a),d({ctx:e,message:"删除音乐成功"})}catch(t){Í,u({ctx:e,message:"删除音乐失败",err:t})}else u({ctx:e,message:"删除音乐失败",err:"缺少参数id"})}),e.post(g("edite/:id"),async function(e,t){const{id:a}=e.params;if(a)try{await i(a,e.request.body),d({ctx:e,message:"修改音乐成功"})}catch(t){u({ctx:e,message:"修改音乐失败",err:t})}else u({ctx:e,message:"修改音乐失败",err:"地址缺少参数id"})}),e.post(g("upload"),async function(e,t){try{const t=await c(e);d({ctx:e,message:"上传成功",result:`http://img.store.naice.me/${t.key}`})}catch(t){u({ctx:e,message:"上传失败",err:t})}})}},function(e,t,a){"use strict";(function(t){const n=a(5),r=a(41),{uploadFile:s,upToQiniu:i,removeTemFile:o}=a(42);e.exports={putMusic:async(e,t)=>await new r(t).save(),delectMusic:async e=>await r.findByIdAndRemove(e),editeMusic:async(e,t)=>await r.findByIdAndUpdate(e,t),getMusic:async(e={})=>{let{state:t="",id:a=""}=e;const n={};return["0","1","2"].includes(t)&&(n.state=Number(t)),a&&(n._id=a),await r.find(n)},upload:async e=>{const a=n.join(t,"../../uploadtemp/"),r=await s(e,{fileType:"poster",path:a}),c=n.join(a,r.imgPath),u=await i(c,r.imgKey);return o(c),u}}}).call(this,"/")},function(e,t,a){"use strict";const n=a(1),r=new n.Schema({title:{type:String},name:{type:String},poster:{type:String},lyrics:{type:String,required:!0,validate:/\S+/},state:{type:Number,default:1},url:{type:String},create_time:{type:Date,default:Date.now},update_at:{type:Date,default:Date.now}});r.pre("findOneAndUpdate",function(e){this.findOneAndUpdate({},{update_at:Date.now()}),e()}),e.exports=n.model("Music",r)},function(e,t,a){const n=a(5),r=a(43),s=a(44),i=a(45),o=a(0),c=e=>!!r.existsSync(e)||!!c(n.dirname(e))&&(r.mkdirSync(e),!0);e.exports={removeTemFile:e=>{r.unlink(e,e=>{if(e)throw e})},upToQiniu:(e,t)=>{const a=o.QINIU.accessKey,n=o.QINIU.secretKey,r=new i.auth.digest.Mac(a,n),s={scope:o.QINIU.bucket},c=new i.rs.PutPolicy(s).uploadToken(r),u=new i.conf.Config;u.zone=i.zone.Zone_z2;const d=e,l=new i.form_up.FormUploader(u),p=new i.form_up.PutExtra;return new Promise((e,a)=>{l.putFile(c,t,d,p,function(t,n,r){t?a(t):e(n)})})},uploadFile:(e,t)=>{const a=new s({headers:e.req.headers}),i=t.fileType,o=n.join(t.path,i);if(c(o))return console.log("start uploading..."),new Promise((t,s)=>{a.on("file",function(e,a,s,c,u){const d=function(e){return Math.random().toString(32).substr(4)+"."+function(e){return e.split(".").pop()}(e)}(s),l=n.join(n.join(o,d));a.pipe(r.createWriteStream(l)),a.on("end",function(){t({imgPath:`/${i}/${d}`,imgKey:d})})}),a.on("finish",function(){console.log("finished...")}),a.on("error",function(e){console.log("err..."),s(e)}),e.req.pipe(a)})}}},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("busboy")},function(e,t){e.exports=require("qiniu")},function(e,t,a){"use strict";const n=a(11),r=a(6),s=a(0),{findOne:i}=a(47),{resError:o,resSuccess:c}=a(2),u=a(3),d=`${s.APP.ROOT_PATH}/user/`,l=e=>`${d}${e}`,p=e=>r.createHash("md5").update(e).digest("hex");e.exports=function(e){e.post(l("login"),u(["username","password"]),async function(e,t){const{username:a,password:r}=e.request.body;try{const t=await i(a);if(t)if(t.password===p(r)){const a=n.sign({name:t.name,password:t.password,exp:Math.floor(Date.now()/1e3)+604800},s.User.jwtTokenSecret);c({ctx:e,result:{token:a,lifeTime:Math.floor(Date.now()/1e3)+604800},message:"登陆成功"})}else o({ctx:e,message:"密码错误!"});else o({ctx:e,message:"账户不存在"})}catch(t){o({ctx:e,message:"查询内部失败",err:t})}})}},function(e,t,a){"use strict";const n=a(10);e.exports={signUp:async e=>await new n(e).save(),findOne:async e=>await n.findOne({username:e}).exec(),getUserInfo:async e=>await n.findOne({username:e},"name username slogan gravatar role"),edite:async(e={})=>{const{_id:t,name:a,username:r,slogan:s,gravatar:i,oldPassword:o,newPassword:c}=e,u=await n.findOne({username:r},"_id name slogan gravatar password role");if(u){if(u.password!==md5Decode(o))return new Error("密码不正确");{const e=""===c?o:c;let n=await Auth.findByIdAndUpdate(t,{_id:t,name:a,username:r,slogan:s,gravatar:i,password:md5Decode(e)},{new:!0});return auth?n:new Error("修改用户资料失败")}}return new Error("修改用户资料失败")}}},function(e,t,a){"use strict";const n=a(8),r=a(0),{putReply:s,delectReply:i,editeReply:o,getReplyById:c,changeReplyStatus:u,likeReply:d}=a(49),{resError:l,resSuccess:p}=a(2),{sendMail:g}=a(13),m=a(3),y=`${r.APP.ROOT_PATH}/reply/`,f=e=>`${y}${e}`,w=e=>{let t="hewenlin1991@gmail.com";e.to&&e.to.email?t+=`, ${e.from.email}, ${e.to.email}`:t+=`, ${e.from.email}`,g({to:t,subject:"你在blog.naice.me有新的评论回复",text:`来自 ${e.from.name} 的评论回复：${e.content}`,html:`<p> 来自${e.from.name} 的评论回复：${e.content}</p><br><a href="${e.permalink}" target="_blank">[ 点击查看 ]</a>`})};e.exports=function(e){e.put(f("add"),m(["post_id","cid","content","from"]),async function(e,t){let a=e.request.body;a.content=n(a.content);try{let t=await s(e,e.request.body);w(t),p({ctx:e,message:"添加评论成功"})}catch(t){l({ctx:e,message:"添加评论失败",err:t})}}),e.get(f("get/:id"),async function(e,t){const{id:a}=e.params;if(a)try{const t=await c(a,e.query);p({ctx:e,message:"获取回复成功",result:t})}catch(t){l({ctx:e,message:"获取回复失败",err:t})}else l({ctx:e,message:"获取回复失败",err:"缺少参数id"})}),e.del(f("delect/:id"),async function(e,t){const{id:a}=e.params;if(a)try{await i(a);p({ctx:e,message:"删除成功"})}catch(t){l({ctx:e,message:"删除失败",err:t})}else l({ctx:e,message:"删除失败",err:"缺少参数id"})}),e.post(f("edite/:id"),async function(e,t){const{id:a}=e.params;if(a)try{await o(a,e.request.body),p({ctx:e,message:"修改回复成功"})}catch(t){l({ctx:e,message:"修改回复失败",err:t})}else l({ctx:e,message:"修改回复失败",err:"地址缺少参数id"})}),e.post(f("status/:id"),async function(e,t){const{id:a}=e.params;if(a)try{await u(a,e.request.body);p({ctx:e,message:"修改回复态成功"})}catch(t){l({ctx:e,message:"修改回复状态失败",err:t})}else l({ctx:e,message:"修改评回复态失败",err:"地址缺少参数id"})}),e.post(f("like/:id"),async function(e,t){const{id:a}=e.params;if(a)try{await d(a);p({ctx:e,message:"修改成功"})}catch(t){l({ctx:e,message:"修改状态失败",err:t})}else l({ctx:e,message:"修改失败",err:"地址缺少参数id"})})}},function(e,t,a){"use strict";const n=a(9),r=a(50),s=a(12);e.exports={putReply:async(e,t)=>{const a=(e.req.headers["x-forwarded-for"]||e.req.headers["x-real-ip"]||e.req.connection.remoteAddress||e.req.socket.remoteAddress||e.req.connection.socket.remoteAddress||e.req.ip||e.req.ips[0]).replace("::ffff:","");t.ip=a||"14.215.177.38",t.agent=e.headers["user-agent"]||t.agent;const i=n.lookup(t.ip);i&&(t.city=i.city,t.range=i.range,t.country=i.country),t.likes=0;const o=await new r(t).save();let c="https://blog.naice.me";t.post_id&&(c=`https://blog.naice.me/article/${t.post_id}`);let u=await s.findOne({_id:t.cid});return u&&(u.reply+=1,await u.save()),o.permalink=c,o},delectReply:async e=>await r.findByIdAndRemove(e),editeReply:async(e,t)=>await r.findByIdAndUpdate(e,t),likeReply:async e=>{let t=await r.findById(e);t&&(t.likes+=1,await t.save())},getReplyById:async(e,t={})=>{let{sort:a=-1,current_page:n=1,page_size:s=20,keyword:i="",post_id:o,state:c}=t,u={};const d={sort:{_id:a=Number(a)},page:Number(n),limit:Number(s)};[1,-1].includes(a)?d.sort={_id:a}:Object.is(a,2)&&(d.sort={likes:-1});let l={cid:e};if(c&&["0","1","2"].includes(c)&&(l.state=c),i){const e=new RegExp(i);l.$or=[{content:e},{"to.name":e},{"to.email":e}]}const p=await r.paginate(l,d);return p&&(u={pagination:{total:p.total,current_page:p.page,total_page:p.pages,per_page:p.limit},data:p.docs}),u},changeReplyStatus:async(e,t)=>await r.findByIdAndUpdate(e,{state:t})}},function(e,t,a){"use strict";const n=a(1),r=a(4),s=new n.Schema({post_id:{type:String,required:!0},cid:{type:String,required:!0},from:{gravatar:{type:String,default:""},name:{type:String,required:!0,validate:/\S+/},email:{type:String,required:!0,validate:/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/},site:{type:String}},to:{gravatar:{type:String,default:""},name:{type:String,validate:/\S+/},email:{type:String,validate:/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/},site:{type:String}},content:{type:String,required:!0,validate:/\S+/},likes:{type:Number,default:0},ip:{type:String},city:{type:String},range:{type:String},country:{type:String},agent:{type:String,validate:/\S+/},state:{type:Number,default:1},create_at:{type:Date,default:Date.now},update_at:{type:Date}});s.plugin(r),s.pre("findOneAndUpdate",function(e){this.findOneAndUpdate({},{update_at:Date.now()}),e()}),e.exports=n.model("Reply",s)},function(e,t,a){"use strict";const n=a(0),{putProject:r,delectProject:s,editeProject:i,getProjectById:o,getProjects:c}=a(52),{resError:u,resSuccess:d}=a(2),l=a(3),p=`${n.APP.ROOT_PATH}/project/`,g=e=>`${p}${e}`;e.exports=function(e){e.put(g("add"),l(["title","icon","view","github","descript"]),async function(e,t){const a=e.request.body;await r(a),d({ctx:e,message:"添加项目成功"})}),e.get(g("get"),async function(e,t){const a=e.query||{},n=await c(a);d({ctx:e,message:"查询项目成功",result:n})}),e.get(g("get/:id"),async function(e,t){const{id:a}=e.params;if(a)try{const t=await o(a);d({ctx:e,message:"查询项目成功",result:t})}catch(t){u({ctx:e,message:"查询项目失败",err:t})}else u({ctx:e,message:"查询项目失败",err:"缺少参数id"})}),e.del(g("delect/:id"),async function(e,t){const{id:a}=e.params;if(a)try{await s(a);d({ctx:e,message:"删除项目成功"})}catch(t){u({ctx:e,message:"删除项目失败",err:t})}else u({ctx:e,message:"删除项目失败",err:"缺少参数id"})}),e.post(g("edite/:id"),async function(e,t){const{id:a}=e.params;if(a)try{await i(a,e.request.body);d({ctx:e,message:"修改项目成功"})}catch(t){u({ctx:e,message:"修改项目失败",err:t})}else u({ctx:e,message:"修改项目失败",err:"地址缺少参数id"})})}},function(e,t,a){"use strict";const n=a(53);e.exports={putProject:async e=>{let t=null;return e&&(t=await new n(e).save()),t},delectProject:async e=>await n.findByIdAndRemove(e),editeProject:async(e,t)=>await n.findByIdAndUpdate(e,t),getProjectById:async e=>await n.findById(e),getProjects:async e=>{const{current_page:t=1,page_size:a=50}=e,r={sort:{create_at:-1},page:Number(t),limit:Number(a)},s=await n.paginate({},r);return!!s&&{pagination:{total:s.total,current_page:s.page,total_page:s.pages,page_size:s.limit},list:s.docs}}}},function(e,t,a){"use strict";const n=a(1),r=a(4),s=new n.Schema({title:{type:String,required:!0},descript:{type:String,required:!0},icon:String,view:String,github:String,create_at:{type:Date,default:Date.now},update_at:{type:Date,default:Date.now}});s.plugin(r),s.pre("findOneAndUpdate",function(e){this.findOneAndUpdate({},{update_at:Date.now()}),e()}),e.exports=n.model("Project",s)}]);