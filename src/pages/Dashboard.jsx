import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal, Spin, Table, Tag, Tooltip } from "antd";
import { TableOutlined } from "@ant-design/icons";
import { createStyles } from "antd-style";

import {
  apiSearchEmails,
  apiExportEmailsToExcel,
  apiGetAccounts,
} from "../api/api";
import TableRowSelection from "../components/TableRowSelection";

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: "15%",
  },
  {
    title: "Account ID",
    dataIndex: "account_id_meta",
    key: "account_id_meta",
    width: "15%",
  },
  {
    title: "Transaction ID",
    dataIndex: "transaction_id",
    key: "transaction_id",
    width: "30%",
  },
  {
    title: "Payment",
    dataIndex: "payment",
    key: "payment",
    width: "10%",
  },
  {
    title: "Card Number",
    dataIndex: "card_number",
    key: "card_number",
    width: "10%",
  },
  {
    title: "Reference Number",
    dataIndex: "reference_number",
    key: "reference_number",
    width: "15%",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    width: "10%",
    render: (status) => {
      const normalizedStatus = (status || "").toLowerCase();
      let color = "default";

      switch (normalizedStatus) {
        case "success":
          color = "green";
          break;
        case "duplicate":
          color = "gold";
          break;
        case "false":
          color = "red";
          break;
        case "none":
          color = "gray";
          break;
        default:
          color = "default";
      }

      return <Tag color={color}>{status}</Tag>;
    },
  },
];

const date = new Date();
const today = date.toISOString().split("T")[0];
const monthAgo = new Date(date.setMonth(date.getMonth() - 1))
  .toISOString()
  .split("T")[0];
const pageSize = 50;

export default function Dashboard() {
  const { styles } = useStyle();
  const [from, setFrom] = useState(monthAgo);
  const [to, setTo] = useState(today);
  const [emails, setEmails] = useState([]);
  const [data, setData] = useState([]);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [isLoadingExport, setIsLoadingExport] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = async (page = 1) => {
    setIsLoadingTable(true);
    try {
      const res = await apiSearchEmails({
        fromDate: from,
        toDate: to,
        accountIDs: emails.map((item) => item.id).join(","),
        page,
        pageSize,
      });
      setData(res);
      setCurrentPage(page);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoadingTable(false);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoadingTable(true);
      try {
        const accounts = await apiGetAccounts();
        const allEmails = accounts.map((item) => ({
          id: item.id,
          email: item.email,
        }));
        setEmails(allEmails);
        const res = await apiSearchEmails({
          fromDate: from,
          toDate: to,
          accountIDs: accounts.map((item) => item.id).join(","),
          page: 1,
          pageSize,
        });
        setData(res);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoadingTable(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleExport = async () => {
    setIsLoadingExport(true);
    try {
      await apiExportEmailsToExcel({
        fromDate: from,
        toDate: to,
        accountIDs: emails.map((item) => item.id).join(","),
      });
    } finally {
      setIsLoadingExport(false);
    }
  };

  const totalEmails = emails.length;

  return (
    <div className="px-10">
      <div className="bg-white rounded mb-4">
        <div className="flex items-center mt-7 gap-40">
          <div className="flex gap-5 items-center">
            <div className="flex gap-7 items-center">
              <Tooltip
                title={
                  emails.length ? (
                    <div className="w-max">
                      {emails.map((item) => (
                        <div
                          key={item.id}
                          className="whitespace-nowrap px-2 py-1"
                        >
                          {item.email}
                        </div>
                      ))}
                    </div>
                  ) : (
                    "No emails selected"
                  )
                }
                color="gray"
                placement="bottomRight"
              >
                <span className="cursor-pointer underline">
                  Number emails: {totalEmails}
                </span>
              </Tooltip>
              <button
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={() => setIsEmailModalOpen(true)}
                title="Select Emails"
              >
                <TableOutlined />
              </button>
              <Modal
                title="Select Emails"
                open={isEmailModalOpen}
                onCancel={() => setIsEmailModalOpen(false)}
                width={700}
                footer={null}
              >
                <TableRowSelection emails={emails} setEmails={setEmails} />
              </Modal>
            </div>
            <div className="flex gap-7 items-center">
              <span>From:</span>
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="border p-2 cursor-pointer"
              />
            </div>
            <div className="flex gap-7 items-center">
              <span>To:</span>
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="border p-2 cursor-pointer"
              />
            </div>
          </div>
          <div className="flex gap-7 items-center">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
              onClick={() => handleSearch(1)}
              disabled={isLoadingTable}
            >
              Search
            </button>
            <button
              onClick={handleExport}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              {isLoadingExport ? "Exporting..." : "Export excel"}
            </button>
          </div>
        </div>
      </div>

      <Table
        className={styles.customTable}
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data.meta_receipts}
        loading={isLoadingTable}
        pagination={{
          current: currentPage,
          pageSize,
          position: ["bottomCenter"],
          total: data.total,
          showSizeChanger: false,
          onChange: (page) => handleSearch(page),
        }}
        scroll={{ y: 55 * 7 }}
      />
      {isLoadingExport && (
        <div className="fixed inset-0 bg-white opacity-75 flex items-center justify-center z-50">
          <Spin tip="Exporting..." />
        </div>
      )}
    </div>
  );
}
