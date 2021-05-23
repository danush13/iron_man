import PropTypes from 'prop types'
import Button from './Button'

const Header = ({ title}) => {
    return (
        <header classname='header'>
            <h1>{title}</h1>

        </header>

    )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.prototype = {
    title: PropTypes.string.isRequired,
    
}