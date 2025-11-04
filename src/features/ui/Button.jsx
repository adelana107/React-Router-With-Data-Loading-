import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type = 'primary' }) {
  const base =
    'inline-block rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed';

  const styles = {
    primary: `${base} px-4 py-3 md:px-6 md:py-4`,
    small: `${base} px-4 py-2 md:px-5 md:py-2.5 text-xs`,
    secondary: `${base} bg-stone-300 hover:bg-stone-200 text-stone-800`,
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

// ✅ Fixed PropTypes validation
Button.propTypes = {
  children: PropTypes.node.isRequired, // button text/content
  disabled: PropTypes.bool, // optional disabled flag
  to: PropTypes.string, // optional link navigation
  type: PropTypes.oneOf(['primary', 'secondary', 'small']), // added 'small'
};

export default Button;
