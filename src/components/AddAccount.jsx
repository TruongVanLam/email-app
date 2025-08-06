import React, { useState } from "react";
import { Modal, Tooltip } from "antd";
import { CopyOutlined, UserAddOutlined } from "@ant-design/icons";
import { apiAddAccount } from "../api/api";

export default function AddAccount() {
  const [modalVisible, setModalVisible] = useState(false);
  const [loginUrl, setLoginUrl] = useState("");
  const [status, setStatus] = useState("Copy");

  const handleAddAccount = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const result = await apiAddAccount(userId);

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

  return (
    <>
      <button
        onClick={handleAddAccount}
        className="flex items-center cursor-pointer rounded-md bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 transition duration-200"
      >
        <UserAddOutlined style={{ fontSize: "15px", marginRight: "3px" }} />
        <span>add account</span>
      </button>
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
