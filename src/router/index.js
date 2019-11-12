import loadable from '@loadable/component';

const routes = [
    {
        path: '/hacker',
        name: '黑客帝国',
        component: loadable(() => import(/* webpackChunkName: 'hacker' */ '../views/Hacker')),
    }
];

export default routes;
