import Navbar from '../../components/Navbar';
import { Alert, AlertTitle } from '@components/ui/alert';
import Loading from '../../components/Loading';

export default function EditMenuItem({ itemId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState({
    name: '', 
    description: '', 
    price: '', 
    category: ''
  });

  useEffect(() => {
    async function fetchItemDetails() {
      try {
        const response = await fetch(`/api/items/${itemId}`);
        const data = await response.json();
        setItem(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch item details:', error);
        setIsLoading(false);
      }
    }

    fetchItemDetails();
  }, [itemId]);

  function handleSaveChanges() {
    async function updateItemDetails() {
      try {
        const response = await fetch(`/api/items/${itemId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });
        if (response.ok) {
          alert('Changes saved successfully!');
        } else {
          throw new Error('Failed to save changes');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    updateItemDetails();
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