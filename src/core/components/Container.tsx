import {
    DndContext,
    DragEndEvent,
    DragMoveEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    // closestCenter,
    useSensor,
    useSensors,
    UniqueIdentifier
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    // rectSwappingStrategy
} from "@dnd-kit/sortable";
import { Card, theme } from "antd";
import React, { useRef, useState } from "react";
import { useImmer } from "use-immer";
import { useElementSize } from 'usehooks-ts'
// import { Link, animateScroll as scroll } from "react-scroll";
import '../style.css'


// import Announcements from "../utils/announcements";

import { layoutData } from '../mock/data'

import Canvas, { Field } from "./Canvas";
import Sidebar, { SidebarField } from "./Sidebar";
import { CloseOutlined } from "@ant-design/icons";

function getData(prop: any) {
    return prop?.data?.current ?? {};
}

type IdType = string | number;
function createSpacer(arg: IdType) {
    if (typeof arg === "number" || typeof arg === "string") {
        return {
            id: arg,
            type: "spacer",
            title: "spacer"
        };
    } else {
        throw new Error("Invalid id type");
    }
}

export default function Container() {
    const { token } = theme.useToken();
    // dnd-kit demo
    const [sidebarFieldsRegenKey, setSidebarFieldsRegenKey] = useState(
        Date.now()
    );
    const spacerInsertedRef = useRef<HTMLElement | string | boolean | null>(null);
    const currentDragFieldRef = useRef<HTMLElement | string | boolean | null>(
        null
    );
    const [activeSidebarField, setActiveSidebarField] = useState<
        null | boolean
    >();
    const [activeField, setActiveField] = useState<null | boolean>(null);

    const [data, updateData] = useImmer({
        fields: [
            {
                id: "shopHeader",
                type: "shopHeader",
                title: "Shop Header",
                disabled: true,
                optionSetting: {
                    shopName: "Shop Name",
                    description: "Shop Description"
                }
            },
            ...layoutData
        ]
    });
    const { fields } = data;

    const handleUpdateSetting = (id: UniqueIdentifier, optionSetting: any) => {
        const newFields = fields.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    optionSetting
                };
            }
            return item;
        });
        updateData((draft) => {
            draft.fields = newFields;
        });
    };

    /**
     * @name handleRemove remove item on canvas
     * @param id
     */
    const handleRemove = (id: UniqueIdentifier) => {
        const newFields = fields.filter((item) => item.id !== id);
        updateData((draft) => {
            draft.fields = newFields;
        });
    };

    const cleanUp = () => {
        setActiveSidebarField(null);
        setActiveField(null);
        currentDragFieldRef.current = null;
        spacerInsertedRef.current = false;
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const containerStyle: React.CSSProperties = {
        position: "relative",
        height: "80vh",
        // overflow: "hidden",
        background: token.colorFillAlter,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
        overflow: "auto",
        // display: "flex"
    };

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
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
            draft.fields.splice(index, 1, createSpacer(active.id));
        });
    };

    const handleDragOver = (event: DragMoveEvent) => {
        const { active, over } = event;
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
                const spacer = createSpacer(active.id + "-spacer");

                updateData((draft) => {
                    if (!draft.fields.length) {
                        // draft.fields.push(spacer);
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
                // console.log('handleDragOver - 3', fields);
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

                // console.log('handleDragOver - 4', fields);
            }
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { over } = event;
        // console.log('handleDragEnd - 1', event);

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

    const [squareRef, { width }] = useElementSize()
    const widthContainer = width;
    const leftSetting = (widthContainer / 2) + (350 / 2) + 30;

    console.log('fields', fields);

    return (
        <div style={containerStyle} ref={squareRef}>
            <DndContext
                sensors={sensors}
                // collisionDetection={closestCenter}
                /**
                 * When drag starts:
                 * Set the draggable element's parent to the nearest <Droppable />
                 */
                onDragStart={handleDragStart}
                /**
                 * while dragging:
                 */
                onDragOver={handleDragOver}
                /**
                 * When drag ends:
                 * Remove the dragged item state
                 * Update the layout state
                 */
                onDragEnd={handleDragEnd}
                autoScroll
            // modifiers={[restrictToVerticalAxis]}
            >
                {/* <Announcements /> */}
                {/**
                 * Components that use `useDraggable`
                 * Elements that can be dragged
                 */}
                <Sidebar fieldsRegKey={sidebarFieldsRegenKey} />
                <div>
                    <div className="preview-wrapper" style={{
                        position: 'absolute',
                        left: '50%',
                        // transform: 'top center',
                        marginLeft: '-260px',
                        transform: 'translate(77px) scale(1)',
                    }}>
                        <SortableContext
                            strategy={verticalListSortingStrategy}
                            items={fields.map((field: any) => field.id)}
                        >
                            <Canvas
                                items={fields}
                                onRemove={handleRemove}
                                onUpdateSetting={handleUpdateSetting}
                            />
                        </SortableContext>
                    </div>
                    <div
                        className="setting-container"
                        style={{
                            border: '1px solid #09af2d',
                            // backgroundColor: '#09af2d',
                            width: '400px',
                            height: '100%',
                            position: 'absolute',
                            left: leftSetting
                        }}>

                        <Card title="Card title" style={{ width: '100%' }} extra={<CloseOutlined />}>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>

                    </div>
                </div>
                <DragOverlay>
                    {activeSidebarField ? (
                        <SidebarField overlay field={activeSidebarField} />
                    ) : null}
                    {activeField ? <Field overlay field={activeField} /> : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}
