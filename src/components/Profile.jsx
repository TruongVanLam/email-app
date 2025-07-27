import React, { useState } from "react";
import {
  LoginOutlined,
  UserAddOutlined,
  UserOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Space, Modal, Tooltip } from "antd";
import { addAccount, logout } from "../api/api";

export default function Profile() {
  const [modalVisible, setModalVisible] = useState(false);
  const [loginUrl, setLoginUrl] = useState("");
  const [status, setStatus] = useState("Copy");
  const username = localStorage.getItem("email").split("@")[0];

  const handleAddAccount = async () => {
    try {
      const result = await addAccount();

      if (result?.login_url) {
        setLoginUrl(result.login_url);
        setModalVisible(true);
      } else {
        alert("Không tìm thấy đường dẫn đăng nhập.");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(loginUrl).then(() => {
      setStatus("Copied!");
    });
    setTimeout(() => {
      setStatus("Copy");
    }, 2000);
  };

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
        await logout();
        window.location.reload();
      },
    },
    {
      key: "3",
      label: "Add Account",
      icon: <UserAddOutlined />,
      extra: "⌘P",
      onClick: handleAddAccount,
    },
  ];

  return (
    <>
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

      <Modal
        title={
          <span className="text-2xl font-semibold">Link login Microsoft</span>
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={700}
        classNames={{ title: "text-2xl" }}
      >
        <div className="gap-4 pt-2">
          <div className="flex justify-between mb-2">
            <div className="text-sm underline text-red-500">
              Note: Open with incognito browser
            </div>
            <Tooltip title={status}>
              <CopyOutlined
                style={{ fontSize: "18px", cursor: "pointer" }}
                onClick={handleCopy}
              />
            </Tooltip>
          </div>
          <div className="border border-gray-300 rounded p-2 text-sm font-sans line-clamp-4">
            {loginUrl}
          </div>
        </div>
      </Modal>
    </>
  );
}
