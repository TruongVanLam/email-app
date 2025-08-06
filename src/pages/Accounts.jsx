import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { Table, Input, Button, Popconfirm } from "antd";
import AddAccount from "../components/AddAccount";
import { apiGetAccounts, apiDeleteAccount } from "../api/api";

const confirm = (record) => {
  apiDeleteAccount(record.id);
  toast.success(`Deleted account with ID: ${record.id}`);
};
const cancel = () => {};

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    width: 50,
  },
  {
    title: "Email",
    dataIndex: "email",
    width: 300,
  },
  {
    title: "Name",
    dataIndex: "name",
    width: 200,
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    width: 150,
    render: (text) => dayjs(text).format("DD/MM/YYYY HH:mm"),
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Popconfirm
        title="Delete the account"
        description="Are you sure to delete this email account?"
        onConfirm={() => confirm(record)}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button danger>Delete</Button>
      </Popconfirm>
    ),
    width: 100,
  },
];

export default function Accounts() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [isLoadingTable, setIsLoadingTable] = useState(false);

  useEffect(() => {
    setIsLoadingTable(true);
    const fetchAccounts = async () => {
      try {
        const result = await apiGetAccounts();
        setData(result);
        setFilteredData(result);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoadingTable(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchEmail(value);

    const filtered = data.filter((item) =>
      item.email.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="h-full">
      <div className=" rounded mb-4">
        <div className="flex items-center mt-7 gap-40">
          <div className="flex items-center justify-between w-full">
            <Input
              placeholder="Search by email..."
              value={searchEmail}
              onChange={handleSearch}
              style={{ width: 300 }}
            />
            <AddAccount />
          </div>
        </div>
      </div>
      <Table
        size="large"
        rowKey="id"
        loading={isLoadingTable}
        columns={columns}
        dataSource={filteredData}
        pagination={{
          pageSize: 10,
          position: ["bottomCenter"],
          total: filteredData.length,
        }}
        scroll={{ y: 55 * 7 }}
      />
    </div>
  );
}
