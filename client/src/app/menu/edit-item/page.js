import Navbar from '../../components/Navbar';
import { Alert, AlertTitle } from '@components/ui/alert';
import Loading from '../../components/Loading';
import { fetchItemDetails, updateItemDetails } from './actions';  // Ensure path correctness

export default function EditMenuItem({ itemId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState({
    name: '', 
    description: '', 
    price: '', 
    category: ''
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchItemDetails(itemId);
        setItem(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch item details:', error);
        setIsLoading(false);  // Consider setting an error state and displaying it
      }
    }

    fetchData();
  }, [itemId]);

  async function handleSaveChanges() {
    try {
      await updateItemDetails(itemId, item);
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Failed to save changes.');
    }
  }

  if (isLoading) return <Loading />;

  return (
    <>
      <Navbar />
      <div className="edit-menu-item">
        <h1>Edit Menu Item</h1>
        <form>
          <label>Name</label>
          <input type="text" value={item.name} readOnly />
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
      </div>
    </>
  );
}
