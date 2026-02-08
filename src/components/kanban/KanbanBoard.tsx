'use client';

import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useState } from 'react';
import { useTaskStore } from '@/stores/useTaskStore';
import { COLUMNS, type ColumnId, type Task } from '@/types';
import { KanbanColumn } from './KanbanColumn';
import { TaskCard } from './TaskCard';

export function KanbanBoard() {
  const { tasks, moveTask, reorderTasks } = useTaskStore();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t: Task) => t.id === event.active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = tasks.find((t: Task) => t.id === activeId);
    if (!activeTask) return;

    // Check if dropping over a column
    const isOverColumn = COLUMNS.some((col) => col.id === overId);
    if (isOverColumn) {
      const newColumnId = overId as ColumnId;
      if (activeTask.columnId !== newColumnId) {
        const columnTasks = tasks.filter((t: Task) => t.columnId === newColumnId);
        moveTask(activeId, newColumnId, columnTasks.length);
      }
      return;
    }

    // Check if dropping over another task
    const overTask = tasks.find((t: Task) => t.id === overId);
    if (overTask && activeTask.columnId !== overTask.columnId) {
      moveTask(activeId, overTask.columnId, overTask.order);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const activeTask = tasks.find((t: Task) => t.id === activeId);
    const overTask = tasks.find((t: Task) => t.id === overId);

    if (activeTask && overTask && activeTask.columnId === overTask.columnId) {
      reorderTasks(activeId, overId, activeTask.columnId);
    }
  };

  const getTasksByColumn = (columnId: ColumnId) =>
    tasks.filter((task: Task) => task.columnId === columnId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 p-6 overflow-x-auto h-full">
        {COLUMNS.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={getTasksByColumn(column.id)}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask && (
          <div className="rotate-3">
            <TaskCard task={activeTask} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
