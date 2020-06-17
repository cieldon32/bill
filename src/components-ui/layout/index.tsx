import React from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import routers from '@/routers';

const NoMatchPage = () => {
  return <h3>404 - Not found</h3>;
};

const Layout = () => (
  <>
    <div className="flex bg-white border-b border-gray-200 fixed top-0 inset-x-0 z-100 h-16 items-center">
      <div className="w-full max-w-screen-xl relative mx-auto px-6">
        <div className="flex items-center -mx-6">
          <div className="lg:w-1/4 xl:w-1/5 pl-6 pr-6 lg:pr-8">
            <Link to="/" className="flex items-center">
              Bill Center
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className="w-full min-h-screen box-border pt-16 flex">
      <Router>
        <Switch>
          {routers.map((item: any) => (
            <Route exact key={item.path} path={item.path} component={item.component} />
          ))}
          <Route component={NoMatchPage} />
        </Switch>
      </Router>
    </div>
  </>
);
export default Layout;
