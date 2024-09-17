import styles from './Button.module.scss'
import classNames from 'classnames/bind';

import { Link } from 'react-router-dom';

const cx = classNames.bind(styles)
function Button(
    {
        children,
        onClick,
        title,
        to = false,
        href = false,
        small = false,
        medium = false,
        long = false,
        circle = false,
        outline = false,
        bgFill = false,
        onlyIcon = false,
        classnames,
        leftIcon,
        rightIcon,
        ...subprops
    }) {

        const props = {
            onClick,
            ...subprops
        }

    let Comp = 'button'
    if (to) {
        Comp = Link
        props.to = to
    } else if (href) {
        Comp = 'a'
        props.href = href
    } 

    const classes = cx('wrapper', {
        //size
        small,
        medium,
        long,

        //shape
        circle,

        //styles
        onlyIcon,
        outline,
        bgFill,
        [classnames] : classnames
    })

    return <Comp title={title} className= {classes} {...props}>
        {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
        <span className={cx('btn-name')}>{children}</span>
        {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
    </Comp>;
}

export default Button;