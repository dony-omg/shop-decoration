import React, { useState, useRef } from 'react'
import { theme } from 'antd';
import {
    closestCenter,
    DndContext,
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useImmer } from "use-immer";
// import Draggable from './Draggable';
// import Droppable from './Droppable';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import ItemElement from './ItemElement';


function getData(prop) {
    return prop?.data?.current ?? {};
}

function createSpacer({ id }: { id: string }) {
    return {
        id,
        type: "spacer",
        title: "spacer"
    };
}

export default function EditContainer() {
    const { token } = theme.useToken();

    // dnd-kit demo
    const [sidebarFieldsRegenKey, setSidebarFieldsRegenKey] = useState(
        Date.now()
    );
    const [activeId, setActiveId] = useState(null);
    const spacerInsertedRef = useRef(null);
    const currentDragFieldRef = useRef(null);
    const [activeSidebarField, setActiveSidebarField] = useState<null | boolean>();
    const [activeField, setActiveField] = useState<null | boolean>(null);
    const [data, updateData] = useImmer({
        fields: []
    });
    console.log('EditContainer', data)
    // const fields = [];

    const { fields } = data;

    const cleanUp = () => {
        setActiveSidebarField(null);
        setActiveField(null);
        currentDragFieldRef.current = null;
        spacerInsertedRef.current = false;
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const containerStyle: React.CSSProperties = {
        position: 'relative',
        height: '80vh',
        // padding: 48,
        overflow: 'hidden',
        background: token.colorFillAlter,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
        overflowY: 'auto',
    };

    const handleDragStart = (e) => {
        const { active } = e;
        const activeData = getData(active);

        // This is where the cloning starts.
        // We set up a ref to the field we're dragging
        // from the sidebar so that we can finish the clone
        // in the onDragEnd handler.
        if (activeData.fromSidebar) {
            const { field } = activeData;
            const { type } = field;
            setActiveSidebarField(field);
            // Create a new field that'll be added to the fields array
            // if we drag it over the canvas.
            currentDragFieldRef.current = {
                id: active.id,
                type,
                name: `${type}${fields.length + 1}`,
                parent: null
            };

            return;
        }

        // We aren't creating a new element so go ahead and just insert the spacer
        // since this field already belongs to the canvas.
        const { field, index } = activeData;

        setActiveField(field);
        currentDragFieldRef.current = field;
        updateData((draft) => {
            draft.fields.splice(index, 1, createSpacer({ id: active.id }));
        });
    };

    const handleDragOver = (e) => {
        const { active, over } = e;
        const activeData = getData(active);

        // Once we detect that a sidebar field is being moved over the canvas
        // we create the spacer using the sidebar fields id with a spacer suffix and add into the
        // fields array so that it'll be rendered on the canvas.

        // 🐑 CLONING 🐑
        // This is where the clone occurs. We're taking the id that was assigned to
        // sidebar field and reusing it for the spacer that we insert to the canvas.
        if (activeData.fromSidebar) {
            const overData = getData(over);

            if (!spacerInsertedRef.current) {
                const spacer = createSpacer({
                    id: active.id + "-spacer"
                });

                updateData((draft) => {
                    if (!draft.fields.length) {
                        draft.fields.push(spacer);
                    } else {
                        const nextIndex =
                            overData.index > -1 ? overData.index : draft.fields.length;

                        draft.fields.splice(nextIndex, 0, spacer);
                    }
                    spacerInsertedRef.current = true;
                });
            } else if (!over) {
                // This solves the issue where you could have a spacer handing out in the canvas if you drug
                // a sidebar item on and then off
                updateData((draft) => {
                    draft.fields = draft.fields.filter((f) => f.type !== "spacer");
                });
                spacerInsertedRef.current = false;
            } else {
                // Since we're still technically dragging the sidebar draggable and not one of the sortable draggables
                // we need to make sure we're updating the spacer position to reflect where our drop will occur.
                // We find the spacer and then swap it with the over skipping the op if the two indexes are the same
                updateData((draft) => {
                    const spacerIndex = draft.fields.findIndex(
                        (f) => f.id === active.id + "-spacer"
                    );

                    const nextIndex =
                        overData.index > -1 ? overData.index : draft.fields.length - 1;

                    if (nextIndex === spacerIndex) {
                        return;
                    }

                    draft.fields = arrayMove(draft.fields, spacerIndex, overData.index);
                });
            }
        }
    };

    const handleDragEnd = (e) => {
        const { over } = e;

        // We dropped outside of the over so clean up so we can start fresh.
        if (!over) {
            cleanUp();
            updateData((draft) => {
                draft.fields = draft.fields.filter((f) => f.type !== "spacer");
            });
            return;
        }

        // This is where we commit the clone.
        // We take the field from the this ref and replace the spacer we inserted.
        // Since the ref just holds a reference to a field that the context is aware of
        // we just swap out the spacer with the referenced field.
        const nextField = currentDragFieldRef.current;

        if (nextField) {
            const overData = getData(over);

            updateData((draft) => {
                const spacerIndex = draft.fields.findIndex((f) => f.type === "spacer");
                draft.fields.splice(spacerIndex, 1, nextField);

                draft.fields = arrayMove(
                    draft.fields,
                    spacerIndex,
                    overData.index || 0
                );
            });
        }

        setSidebarFieldsRegenKey(Date.now());
        cleanUp();
    };

    return (
        <div style={containerStyle}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                /**
                 * When drag starts:
                 * Set the draggable element's parent to the nearest <Droppable />
                 */
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                /**
                 * When drag ends:
                 * Remove the dragged item state
                 * Update the layout state
                 */
                onDragEnd={handleDragEnd}
            >
                <div style={{
                    position: 'relative',
                    background: '#f5f5f5',
                }}>
                    {/**
                     * Components that use `useDraggable`
                     * Elements that can be dragged
                    */}
                    <Sidebar />
                    {/* {parent === null ? draggableMarkup : null} */}
                    {/* {draggableMarkup} */}
                    {/* {field.map((item, index) => (
                            <ItemElement
                                // key={item.id}
                                id={item.id}
                                label={item.title}
                            // isActive={draggedItem?.id === item.id}
                            />
                        ))} */}

                    {/* Components that use `useDraggable`, `useDroppable` */}
                    <div style={{ marginLeft: 350, padding: '25px 0' }}>
                        <SortableContext
                            strategy={verticalListSortingStrategy}
                            items={fields?.map((f) => f?.id)}
                        >
                            <Canvas items={fields} />
                        </SortableContext>
                        <DragOverlay>
                            {activeId ? <ItemElement id={activeId} /> : null}
                        </DragOverlay>
                    </div>
                </div>
            </DndContext>
        </div>
    )

}
