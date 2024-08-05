import Footer from './components/Footer';
import Header from './components/Header';
import styles from './MainLayout.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)
function MainLayout({children}) {
    return ( 
        <div className={cx('wrapper')}>
            <Header />
            <div>{children}</div>
            <Footer />
        </div>
     );
}

export default MainLayout;