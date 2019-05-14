// import About  from './routes/About';
import home  from './routes/Home';
import selection from './routes/Selection';
import pool from './routes/Pool';
import loginPage from './routes/User/Login'
import register from './routes/User/Register';
import personal from './routes/User/Personal';
import settings from './routes/User/Settings';
import writing from './routes/User/Writing';
//import hotArticle from './routes/HotArticle';
import readArticle from './routes/Article';
import jobs from './routes/Jobs'
import errorPage from './routes/Error'
import userPage from './routes/UserPage'
//import CommentApp from './components/Card/Comment/commentApp'

export const routerConfig = [
    {
        path:'/login',
        component:loginPage,
        exact: true
    },{

        path:'/register',
        component:register,
        exact: true
    },{
        path:'/',
        component:home,
        exact: true
    },{
        path:'/selection',
        component:selection,
        exact: true,
        auth:true,
    },{
        path:'/pool',
        component:pool,
        exact: true,
        auth:true,
    },{
        path:'/user/personal',
        component:personal,
        exact: true,
        auth:true,
    },{
        path:'/user/settings',
        component:settings,
        exact: true,
        auth:true,
    },{
        path:'/user/writing',
        component:writing,
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
        component:jobs,
        exact: true,
        auth:true,
    },{
        path:'/404',
        component:errorPage
    }
];