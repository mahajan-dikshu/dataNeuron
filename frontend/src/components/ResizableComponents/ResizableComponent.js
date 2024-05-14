/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Resizable } from 're-resizable';
import './ResizableComponent.css';
const apiUrl = process.env.REACT_APP_API_DOMAIN;
const ResizableComponent = ({ index, size, content, componentNumber, handleResize }) => {
  const resizeConfig = {
    top: true,
    right: true,
    bottom: true,
    left: true,
  };

  const [updatedContent, setUpdatedContent] = useState(content);
  const [count, setCount] = useState({ add: 0, update: 0 });
  const [showCount, setShowCount] = useState(false); // State to track whether to show the count

  useEffect(() => {
    if (showCount) {
      fetchCount();
    }
  }, [showCount]); // Fetch count data when showCount changes

  const onResizeStop = (event, direction, ref, d) => {
    handleResize(index, ref.style.width, ref.style.height);
  };

  const handleAdd = async () => {
    const newContent = prompt('Enter new content:');
    if (newContent !== null) {
      const component_number = index + 1; // Component number is 1-based
      try {
        const response = await fetch(`${apiUrl}/components/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ component_number, content: newContent }),
        });
        if (response.ok) {
          // Reload the page after successful addition
          window.location.reload();
        } else {
          console.error('Failed to add component:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding component:', error);
      }
    }
  };

  const handleUpdate = async () => {
    const updatedContent = prompt('Enter updated content:', content);
    if (updatedContent !== null) {
      try {
        const response = await fetch(`${apiUrl}/components/update/${componentNumber}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: updatedContent }),
        });
        if (response.ok) {
          // Update the content state after successful update
          setUpdatedContent(updatedContent);
        } else {
          console.error('Failed to update component:', response.statusText);
        }
      } catch (error) {
        console.error('Error updating component:', error);
      }
    }
  };

  const fetchCount = async () => {
    try {
      const response = await fetch(`${apiUrl}/components/count/${componentNumber}`);
      const data = await response.json();
      if (data.success) {
        const addCountData = data.data.find(entry => entry.operation_type === 'add');
        const updateCountData = data.data.find(entry => entry.operation_type === 'update');
        const addCount = addCountData ? addCountData.count : 0;
        const updateCount = updateCountData ? updateCountData.count : 0;
        setCount({ add: addCount, update: updateCount });
      } else {
        console.error('Error fetching count for component:', data.message);
      }
    } catch (error) {
      console.error('Error fetching count for component:', error);
    }
  };

  const toggleShowCount = () => {
    setShowCount(!showCount);
  };

  return (
    <Resizable
      className="resizable"
      size={{ width: size.width, height: size.height }}
      enable={resizeConfig}
      onResizeStop={onResizeStop}
    >
      <div className="content">
        <p>{updatedContent}</p>
        {showCount && (
          <p>
            Add Count: {count.add}, Update Count: {count.update}
          </p>
        )}
        <div className="button-container">
          <button className="button" onClick={handleAdd}>Add</button>
          <button className="button" onClick={handleUpdate}>Update</button>
          <button className="button" onClick={toggleShowCount}>Count</button>
        </div>
      </div>
    </Resizable>
  );
};

export default ResizableComponent;
