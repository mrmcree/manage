import Vue from 'vue'
import Router from 'vue-router'
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
}
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login',
    
    },
    {
      path:'/login',
      name:'login',
      component:resolve => require(['@/pages/login'], resolve)
    },
    {
      path: '/admin',
      name: 'admin',
      redirect:'/admin/manage',
      component: resolve => require(['@/pages/admin'], resolve),
      beforeEnter: (to, from, next) => {
        if(getCookie('userdata')){
          next()
        }else{
          next('/login')
        }
      },
      children:[
        {
          path:'manage',
          name:'manage',
          component:resolve => require(['@/pages/table'], resolve)
        },
        {
          path:'edit',
          name:'edit',
          component:resolve => require(['@/pages/edit'], resolve)
        }

      ]
    }
    
  ]
})
