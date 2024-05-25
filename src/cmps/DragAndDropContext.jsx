import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

export function DragAndDropContext({ children }) {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
}
