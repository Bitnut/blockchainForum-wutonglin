import About  from './routes/About';
import Home  from './routes/Home';
import Selection from './routes/Selection';
import Pool from './routes/Pool';
import LoginPage from './routes/user/login'
import Register from './routes/user/register';
import Personal from './routes/user/personal';
import Settings from './routes/user/settings';
import Writing from './routes/user/writing';
//import hotArticle from './routes/HotArticle';
import readArticle from './routes/Article';
import Jobs from './routes/Jobs'
import ErrorPage from './routes/Error'
import userPage from './routes/userPage'
//import CommentApp from './components/Card/Comment/commentApp'

export const routerConfig = [
    {
        path:'/about',
        component: About,
        exact: true,
    },{
        path:'/login',
        component:LoginPage,
        exact: true
    },{

        path:'/register',
        component:Register,
        exact: true
    },{
        path:'/',
        component:Home,
        exact: true
    },{
        path:'/selection',
        component:Selection,
        exact: true,
        auth:true,
    },{
        path:'/pool',
        component:Pool,
        exact: true,
        auth:true,
    },{
        path:'/user/personal',
        component:Personal,
        exact: true,
        auth:true,
    },{
        path:'/user/settings',
        component:Settings,
        exact: true,
        auth:true,
    },{
        path:'/user/writing',
        component:Writing,
        exact: true,
        auth:true,
    },{
        path:'/article/:id',
        component:readArticle,
        auth:true,
    },{
        path:'/u/:id',
        component:userPage,
        auth:true,
    },{
        path:'/jobsdone',
        component:Jobs,
        exact: true,
        auth:true,
    },{
        path:'/404',
        component:ErrorPage
    }
];