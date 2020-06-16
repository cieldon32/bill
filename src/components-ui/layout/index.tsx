import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import routers from '@/routers';

const Layout = () => (
  <>
    <div className="flex bg-white border-b border-gray-200 fixed top-0 inset-x-0 z-100 h-16 items-center">
      <div className="w-full max-w-screen-xl relative mx-auto px-6">
        <div className="flex items-center -mx-6">
          <div className="lg:w-1/4 xl:w-1/5 pl-6 pr-6 lg:pr-8">
            <h1 className="flex items-center">Bill Center</h1>
          </div>
        </div>
      </div>
    </div>
    <div className="w-full max-w-screen-xl mx-auto px-6">
      <div className="min-h-screen w-full">
        <div className="pt-8 pb-16 lg:pt-4 w-full"></div>
        <Router>
          <Switch>
            {routers.map((item: any) => (
              <Route exact key={item.path} path={item.path} component={item.component} />
            ))}
          </Switch>
        </Router>
      </div>
    </div>
  </>
);
export default Layout;
