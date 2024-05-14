// App.js
import React, { useState, useEffect } from 'react';
import ResizableComponent from './components/ResizableComponents/ResizableComponent';
import './App.css';

const App = () => {
  const [sizes, setSizes] = useState([
    { width: 300, height: 200 },
    { width: 300, height: 200 },
    { width: 300, height: 200 }
  ]);
  const [componentsData, setComponentsData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4000/components/active');
      const data = await response.json();
      console.log(data);
      if (data.success) {
        // Sort componentsData array based on component_number
        const sortedData = data.data.sort((a, b) => a.component_number - b.component_number);
        setComponentsData(sortedData);
      } else {
        console.error('Error fetching active components:', data.message);
      }
    } catch (error) {
      console.error('Error fetching active components:', error);
    }
  };
  

  const handleResize = (index, width, height) => {
    const newSizes = [...sizes];
    newSizes[index] = { width, height };
    setSizes(newSizes);
  };

  return (
    <div className="App">
      {componentsData.map((component, index) => (
        <ResizableComponent
          key={index}
          index={index}
          content={component.content}
          size={sizes[index]} // Pass size as a prop
          handleResize={handleResize}
          componentNumber={component.component_number} // Pass component number as a prop
        />
      ))}
    </div>
  );
};

export default App;
