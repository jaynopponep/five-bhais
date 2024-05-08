import Navbar from '../../components/Navbar';
import Loading from '../../components/Loading';
import MenuTable from './menuTable';  // Ensure path is correct
import { fetchItemDetails, updateItemDetails } from './actions';

export default function EditItemPage({ itemId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);  // Assume you fetch multiple items to display in MenuTable

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchItemDetails(itemId);
        setItem(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch item details:', error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [itemId]);

  const handleSaveChanges = async () => {
    try {
      await updateItemDetails(itemId, item);
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Failed to save changes.');
    }
  };

  const handleEdit = (item) => {
    console.log('Editing item:', item);
    // Set the item to be edited
    setItem(item);
  };

  const handleDelete = async (itemId) => {
    // Assume delete function exists
    console.log('Deleting item:', itemId);
    // Update items state after deletion
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <Navbar />
      <MenuTable items={items} onEdit={handleEdit} onDelete={handleDelete} />
      <div className="edit-menu-item">
        {item && (
          <form>
            <label>Name</label>
            <input type="text" value={item.name} readOnly onChange={e => setItem({ ...item, name: e.target.value })} />
            <label>Description</label>
            <input type="text" value={item.description} onChange={e => setItem({ ...item, description: e.target.value })} />
            <label>Price</label>
            <input type="number" value={item.price} onChange={e => setItem({ ...item, price: e.target.value })} />
            <label>Category</label>
            <select value={item.category} onChange={e => setItem({ ...item, category: e.target.value })}>
              <option value="starter">Starter</option>
              <option value="main">Main</option>
              <option value="dessert">Dessert</option>
            </select>
            <button type="button" onClick={handleSaveChanges}>Save Changes</button>
          </form>
        )}
      </div>
    </>
  );
}
