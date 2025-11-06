import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Button({
  children,
  disabled = false, // ✅ default value
  to,
  type = 'primary', // ✅ default value
  onClick = () => {}, // ✅ default value
}) {
  const base =
    'inline-block text-sm rounded-full font-semibold uppercase tracking-wide transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed';

  const styles = {
    primary: `${base} bg-yellow-400 text-stone-800 hover:bg-yellow-300 focus:bg-yellow-300 px-4 py-3 md:px-6 md:py-4`,
    small: `${base} bg-red-500 text-white hover:bg-red-600 focus:bg-red-600 px-4 py-2 md:px-5 md:py-2.5 text-xs`,
    round: `${base} bg-red-500 text-white hover:bg-red-600 focus:bg-red-600 px-4 py-2 md:px-5 md:py-2.5 text-xs`,
    secondary: `${base} bg-stone-300 text-stone-800 hover:bg-stone-200 focus:bg-stone-200 px-4 py-3 md:px-6 md:py-4`,
  };

  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={styles[type]}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  to: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'secondary', 'small']),
  onClick: PropTypes.func,
};

export default Button;
