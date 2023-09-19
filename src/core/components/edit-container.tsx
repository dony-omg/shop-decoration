import React, { useState } from 'react'
import { Button, Drawer, theme } from 'antd';
import { DndContext } from '@dnd-kit/core';
import Draggable from './Draggable';
import Droppable from './droppable';

export default function EditContainer() {
    const { token } = theme.useToken();
    const [open, setOpen] = useState(false);

    // dnd-kit demo
    const containers = ['A', 'B', 'C'];
    const [parent, setParent] = useState(null);

    const draggableMarkup = (
        <Draggable id="draggable">Drag me</Draggable>
    );

    /**
     * @name handleDragEnd event
     * @description When the user drops the item
     * @param event
     */
    function handleDragEnd(event) {
        const { over } = event;

        // If the item is dropped over a container, set it as the parent
        // otherwise reset the parent to `null`
        setParent(over ? over.id : null);
    }

    // handel drawer antd example - handel element drop
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const containerStyle: React.CSSProperties = {
        position: 'relative',
        height: '100vh',
        padding: 48,
        overflow: 'hidden',
        textAlign: 'center',
        background: token.colorFillAlter,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

    return (
        <div style={containerStyle}>
            <DndContext
                /**
                 * When drag starts:
                 * Set the draggable element's parent to the nearest <Droppable />
                 */
                onDragStart={() => { }}
                /**
                 * When drag ends:
                 * Remove the dragged item state
                 * Update the layout state
                 */
                onDragEnd={handleDragEnd}
            >
                <div style={{ marginTop: 16 }}>
                    <Button type="primary" onClick={showDrawer}>
                        Open
                    </Button>
                </div>

                <Drawer
                    title="Basic Drawer"
                    placement="left"
                    closable={false}
                    onClose={onClose}
                    open={open}
                    getContainer={false}
                >
                    {/* {parent === null ? draggableMarkup : null} */}
                    {draggableMarkup}
                </Drawer>

                {/* Components that use `useDraggable`, `useDroppable` */}

                {containers.map((id) => (
                    <Droppable key={id} id={id}>
                        {parent === id ? draggableMarkup : 'Drop here'}
                    </Droppable>)
                )}
            </DndContext>
        </div>
    )
}
