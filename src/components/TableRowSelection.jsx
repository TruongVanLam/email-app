import React, { useEffect, useState } from "react";
import { Table } from "antd";

import { apiGetAccounts } from "../api/api";

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
];

export default function TableRowSelection({ emails, setEmails }) {
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState(emails);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const result = await apiGetAccounts();
        setData(result);

        const allIds = result.map((item) => item.id);
        setSelectedRowKeys(allIds);

        const allEmails = result.map((item) => ({
          id: item.id,
          email: item.email,
        }));
        setEmails(allEmails);
      } catch (err) {
        console.error("Not found accounts:", err);
      }
    };

    fetchAccounts();
  }, []);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    const selectedEmails = data
      .filter((item) => newSelectedRowKeys.includes(item.id))
      .map((item) => {
        return { id: item.id, email: item.email };
      });
    setEmails(selectedEmails);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <Table
      size="large"
      rowKey="id"
      rowSelection={rowSelection}
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 10 }}
      scroll={{ y: 65 * 5 }}
    />
  );
}
