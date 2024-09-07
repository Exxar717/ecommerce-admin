import React from "react";
import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  RiDashboard3Line,
  RiShoppingCartLine,
  RiUserLine,
  RiFileList2Line,
  RiBold,
  RiFileList3Line,
  RiListUnordered,
  RiCopyrightLine,
  RiBrushLine,
  RiPaletteLine,
  RiBookReadLine,
  RiBox3Line,
  RiChat4Line,
  RiListCheck2,
  RiChatSettingsLine,
  RiChatNewLine,
  RiListCheck3,
  RiInformationLine,
  RiNotification2Line,
  RiCoupon4Line,
  RiCouponLine,
  RiLogoutBoxRLine
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sl-logo">PC</span>
            <span className="lg-logo">Pussy Corner</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
              localStorage.clear();
              window.location.reload();
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <RiDashboard3Line className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <RiUserLine className="fs-4" />,
              label: "Customers",
            },
            {
              key: "catalog",
              icon: <RiBookReadLine className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <RiShoppingCartLine className="fs-4" />,
                  label: "Add product",
                },
                {
                  key: "product-list",
                  icon: <RiFileList2Line className="fs-4" />,
                  label: "Product list",
                },
                {
                  key: "brand",
                  icon: <RiBold className="fs-4" />,
                  label: "Brand",
                },
                {
                  key: "brand-list",
                  icon: <RiFileList3Line className="fs-4" />,
                  label: "Brand-list",
                },
                {
                  key: "category",
                  icon: <RiCopyrightLine className="fs-4" />,
                  label: "Category",
                },
                {
                  key: "category-list",
                  icon: <RiListUnordered className="fs-4" />,
                  label: "Category-list",
                },
                {
                  key: "color",
                  icon: <RiBrushLine className="fs-4" />,
                  label: "Color",
                },
                {
                  key: "color-list",
                  icon: <RiPaletteLine className="fs-4" />,
                  label: "Color-list",
                },
              ],
            },
            {
              key: "orders",
              icon: <RiBox3Line className="fs-4" />,
              label: "Orders",
            },
            {
              key: "marketing",
              icon: <RiCoupon4Line className="fs-4" />,
              label: "Marketing",
              children: [
                {
                  key: "add-coupon",
                  icon: <RiCoupon4Line className="fs-4" />,
                  label: "Add Coupon",
                },
                {
                  key: "coupons-list",
                  icon: <RiCouponLine className="fs-4" />,
                  label: "Coupons-list",
                },
              ],
            },
            {
              key: "blogs",
              icon: <RiChat4Line className="fs-4" />,
              label: "Blogs",
              children: [
                {
                  key: "add-blog",
                  icon: <RiChatNewLine className="fs-4" />,
                  label: "Add blog",
                },
                {
                  key: "blogs-list",
                  icon: <RiListCheck2 className="fs-4" />,
                  label: "Blogs-list",
                },
                {
                  key: "blogs-category",
                  icon: <RiChatSettingsLine className="fs-4" />,
                  label: "Blogs-category",
                },
                {
                  key: "blogs-category-list",
                  icon: <RiListCheck3 className="fs-4" />,
                  label: "Blogs-category-list",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <RiInformationLine className="fs-4" />,
              label: "Enquiries",
            },
            {
              key: "signout",
              icon: <RiLogoutBoxRLine className="fs-4" />,
              label: "Sign Out",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <RiNotification2Line className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>
            <div className="d-flex gap-3 align-items-center">
              <div>
                <img
                  className="profilePic"
                  src="https://w0.peakpx.com/wallpaper/979/89/HD-wallpaper-purple-smile-design-eye-smily-profile-pic-face.jpg"
                  alt="profile"
                />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">PC BRUH</h5>
                <p className="mb-0">PCBruh@destroyer.com</p>
              </div>
              <ul
                className="dropdown-menu dropdown-menu-end"
                style={{ height: "auto", minWidth: "2rem", lineHeight: "20px" }}
                aria-labelledby="dropdownMenuLink"
              >
                <li>
                  <Link className="dropdown-item py-1 mb-1" to="/">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item py-1 mb-1" to="/">
                    Signout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
