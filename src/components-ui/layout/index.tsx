import React from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import routers from '@/routers';
import * as styles from './styles';

const NoMatchPage = () => {
  return <h3>404 - Not found</h3>;
};

const Layout = () => (
  <>
    <div className={styles.head}>
      <div className={styles.headWrap}>
        <Link to="/" className={styles.logo}>
          Bill Center
        </Link>
      </div>
    </div>
    <div className={styles.content}>
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
