import React, {useState} from 'react';
import {Redirect, Route, NavLink, Switch, withRouter} from 'react-router-dom';
import {Layout, Menu, Icon} from 'antd';
import routes from './router';
import './App.css';

const {Header, Sider, Content} = Layout;

function App({location}) {
    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => setCollapsed(!collapsed);
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="title">Canvas真好玩</div>
                <Menu theme="dark" mode="inline"
                      defaultSelectedKeys={[location.pathname.length === 1 ? routes[0].path : location.pathname]}>
                    {
                        routes.map(route =>
                            <Menu.Item
                                key={route.path}>
                                <NavLink
                                    to={route.path}
                                    style={{color: 'rgba(255,255,255,.65)'}}
                                    activeStyle={{color: '#fff'}}
                                >
                                    {route.name}
                                </NavLink>
                            </Menu.Item>)
                    }
                </Menu>
            </Sider>
            <Layout>
                <Header style={{background: '#fff', padding: 0}}>
                    <Icon
                        className="trigger"
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={toggle}
                    />
                </Header>
                <Content
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '24px 16px',
                        padding: 24,
                        background: '#fff',
                        minHeight: 280,
                    }}
                >
                    <Switch>
                        {
                            routes.map((route, i) =>
                                <Route
                                    path={route.path}
                                    exact={route.exact}
                                    render={props => <route.component {...props} router={route.routes}/>}
                                    key={i}
                                />
                            )
                        }
                        <Redirect from="/" to="/hacker" exact={true}/>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
}

export default withRouter(App);
