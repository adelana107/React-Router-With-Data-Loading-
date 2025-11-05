import PropTypes from 'prop-types';
import { formatCurrency } from '../../utils/helpers';
import Button from '../ui/Button';
import DeleteItem from '../cart/DeleteItem';

function CartItem({ item }) {
  const { name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="sm:mb mb-1">
        {quantity} × {name}
      </p>

      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
