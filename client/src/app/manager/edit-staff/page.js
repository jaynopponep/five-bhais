// imports
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Loading from '../../components/Loading';
import MenuTable from './menuTable'; //its declared but isnt used at all
// for this one make sure it lines up with what jay is currently working on
import { fetchItemDetails, updateItemDetails } from './actions';
export default function EditMenuItemPage({ itemId }) {
    // State for managing the loading status to control rendering of the Loading component
    const [isLoading, setIsLoading] = useState(true);

    // State for storing and managing the current item's data
    const [item, setItem] = useState({
        name: '',
        description: '',
        price: '',
        category: ''
    });

    // useEffect hook to fetch item details when component mounts or itemId changes
    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch item details using the itemId passed to the component
                const data = await fetchItemDetails(itemId);
                setItem(data);  // Store the fetched data in state
                setIsLoading(false);  // Set loading to false once data is loaded
            } catch (error) {
                console.error('Failed to fetch item details:', error);  // Log any errors
                setIsLoading(false);  // Ensure loading is set to false on error as well
            }
        }

        fetchData();
    }, [itemId]);  // Dependency array with itemId to re-fetch data when it changes

    // Function to handle saving changes made to the item
    const handleSaveChanges = async () => {
        try {
            // Call the update API action
            await updateItemDetails(item);
            alert('Changes saved successfully!');  // Notify user of success
        } catch (error) {
            console.error('Error updating item:', error);  // Log any errors
            alert('Failed to save changes.');  // Notify user of failure
        }
    };

    // Conditional rendering based on loading state
    if (isLoading) return <Loading />;  // Show loading indicator while data is loading

    return (
        <>
            <Navbar />
            <div className="edit-menu-item">
                <h1>Edit Menu Item</h1>
                <form>
                    <label>Name</label>
                    <input type="text" value={item.name} readOnly />  {/* Input for name, not editable */}

                    <label>Description</label>
                    <input type="text" value={item.description} onChange={e => setItem({ ...item, description: e.target.value })} /> {/* Editable input for description */}

                    <label>Price</label>
                    <input type="number" value={item.price} onChange={e => setItem({ ...item, price: e.target.value })} /> {/* Editable input for price */}

                    <label>Category</label>
                    <select value={item.category} onChange={e => setItem({ ...item, category: e.target.value })}> {/* Dropdown for selecting category */}
                        <option value="starter">Starter</option>
                        <option value="main">Main</option>
                        <option value="dessert">Dessert</option>
                    </select>

                    <button type="button" onClick={handleSaveChanges}>Save Changes</button>  {/* Button to trigger save operation */}
                </form>
            </div>
        </>
    );
}
