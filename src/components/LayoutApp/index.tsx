import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import React from "react";

const { Header, Content } = Layout;

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
    key,
    label: `nav ${key}`
}));

interface PropsType {
    children?: React.ReactNode;
}

/* The code defines a functional component called `LayoutApp` which is a layout component for a React
application. It takes in a prop called `children` which represents the content to be rendered inside
the layout. */
const LayoutApp: React.FC = ({ children }: PropsType) => {
    const {
        token: { colorBgContainer }
    } = theme.useToken();

    return (
        <Layout>
            <Header style={{ display: "flex", alignItems: "center" }}>
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["2"]}
                //   items={items1}
                />
            </Header>
            <Layout>
                <Layout style={{ padding: "0 24px 24px" }}>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default LayoutApp;
