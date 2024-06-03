import { DragAndDropContext } from "./DragAndDropContext";
import { QueueMenu } from "./QueueMenu";

export function SidePopUp() {
  return (
    <DragAndDropContext>
      <section className="side-pop-up">
        <QueueMenu />
      </section>
    </DragAndDropContext>
  );
}
