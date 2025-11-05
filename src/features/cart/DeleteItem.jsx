import PropTypes from 'prop-types';
import Button from '../ui/Button';
import { useDispatch } from 'react-redux';
import { deleteItem } from './cartSlice';

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteItem(pizzaId));
  };

  return (
    <Button type="small" onClick={handleDelete}>
      Delete
    </Button>
  );
}

DeleteItem.propTypes = {
  pizzaId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default DeleteItem;
 