import { Outlet, useNavigate, useLocation } from "react-router-dom";
import FooterCustom from "../components/Footer";
import { Layout, Menu } from "antd";
import Profile from "../components/Profile";
import { useCallback } from "react";

const { Header, Content } = Layout;

const items = [
  {
    key: "home",
    label: "Home",
  },
  {
    key: "accounts",
    label: "Accounts",
  },
];

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const handleMenuClick = useCallback(
    ({ key }) => {
      navigate(`/${key}`);
    },
    [navigate]
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="w-[120px] min-w-[120px] h-[32px] bg-white/20 rounded-[6px] me-6"></div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[path.split("/")[1] || "home"]}
          items={items}
          onClick={handleMenuClick}
          style={{ flex: 1, minWidth: 0 }}
        />
        <Profile />
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Outlet />
      </Content>
      <FooterCustom>
        Outlook-mail ©{new Date().getFullYear()} truongvanlam176@gmail.com
      </FooterCustom>
    </Layout>
  );
}
