'use client'
import React, { useState, ReactNode } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from '@hello-pangea/dnd';

interface Item {
  id: string;
  content: string;
}

export const DroppableComponent: React.FC<{ droppableId: string, children: ReactNode }> = ({ droppableId = 'droppable-1', children }) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided: DroppableProvided, snapshot: any) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export const DraggableComponent: React.FC<{ item: Item; index: number }> = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided: DraggableProvided, snapshot: any) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {item.content}
        </div>
      )}
    </Draggable>
  );
};

function DragAndDropList() {
  const [items, setItems] = useState<Item[]>([
    { id: '1', content: 'Item 1' },
    { id: '2', content: 'Item 2' },
    { id: '3', content: 'Item 3' },
  ]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DroppableComponent droppableId="droppable-1">
        {items.map((item, index) => (
          <DraggableComponent key={item.id} item={item} index={index} />
        ))}
      </DroppableComponent>
    </DragDropContext>
  );
}

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export default DragAndDropList;