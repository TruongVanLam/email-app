import { LoginOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Space } from "antd";
import { apiLogout } from "../api/api";

export default function Profile() {
  const username = localStorage.getItem("email").split("@")[0];

  const items = [
    {
      key: "1",
      label: "My Account",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Logout",
      icon: <LoginOutlined />,
      extra: "⌘P",
      onClick: async () => {
        await apiLogout();
        window.location.reload();
      },
    },
  ];

  return (
    <Dropdown menu={{ items }} className="cursor-pointer">
      <a onClick={(e) => e.preventDefault()}>
        <Space className="underline pr-3">{username}</Space>
        <Avatar
          style={{ backgroundColor: "#87d068" }}
          icon={<UserOutlined />}
          size="small"
        />
      </a>
    </Dropdown>
  );
}
