import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Button from '../ui/Button';
import {
  decreaseItemQuantity,
  increaseItemQuantity,
} from './cartSlice'; 

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>

      <span className="text-sm font-medium">{currentQuantity}</span>

      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

// ✅ Add PropTypes validation
UpdateItemQuantity.propTypes = {
  pizzaId: PropTypes.number.isRequired,
  currentQuantity: PropTypes.number.isRequired,
};

export default UpdateItemQuantity;
