import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 2, description: "charger", quantity: 1, packed: true },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAdditems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleChecked(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAdditems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItemCheck={handleChecked}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1> 🎄Far Away🎃</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setquantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    setDescription("");
    setquantity("");
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <h4>What do you need for your trip?😊</h4>
      <select
        id=""
        value={quantity}
        onChange={(e) => setquantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        placeholder="item..."
        value={description}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItemCheck }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItemCheck={onToggleItemCheck}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItemCheck }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItemCheck(item.id)}
      />
      <span style={item.packed ? { textDecoration: "Line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding items to your packing list 🧳</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const Percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {Percentage === 100
          ? "You have all items packed"
          : `you have ${numItems} items on your list, and you have already packed ${numPacked} (${Percentage}%)`}
      </em>
    </footer>
  );
}
