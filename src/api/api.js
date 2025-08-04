const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import {
  createFilename,
  handleDownload,
  handleTokenExpiration,
} from "../utils/common.js";

const handleResponseError = (res) => {
  if (!res.ok) {
    if (res.status.toString().startsWith("4")) {
      handleTokenExpiration();
      return;
    } else if (res.status.toString().startsWith("5")) {
      throw new Error("Server error, please try again later.");
    }
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }
};

export async function apiLogin(email, password) {
  const res = await fetch(`${API_BASE_URL}/api/v1/users/login`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error(`Email or password is incorrect!`);
  }

  const data = await res.json();
  return data;
}

export async function apiGetAccounts() {
  const res = await fetch(`${API_BASE_URL}/api/v1/accounts`, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Không thể lấy danh sách tài khoản");
  }
  try {
    const result = await res.json();
    return result.accounts;
  } catch (err) {
    throw new Error(`Could not pass to json: ${err.message}`);
  }
}

export async function apiAddAccount() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/login`, {
      method: "GET",
      headers: { accept: "application/json" },
    });

    return await res.json();
  } catch (err) {
    throw new Error(`Could not pass to json: ${err.message}`);
  }
}

export async function apiSearchEmails({
  fromDate,
  toDate,
  accountIDs,
  page,
  pageSize,
}) {
  const params = new URLSearchParams();
  if (accountIDs) params.append("account_ids", accountIDs);
  if (fromDate) params.append("from_date", fromDate);
  if (toDate) params.append("to_date", toDate);
  if (page) params.append("current_page", page);
  if (pageSize) params.append("page_size", pageSize);

  try {
    const res = await fetch(
      `${API_BASE_URL}/api/v1/mails?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    handleResponseError(res);
    return res.json();
  } catch (err) {
    throw new Error(`Could not pass to json: ${err.message}`);
  }
}

export async function apiExportEmailsToExcel({ fromDate, toDate, accountIDs }) {
  const params = new URLSearchParams();
  if (fromDate) params.append("from_date", fromDate);
  if (toDate) params.append("to_date", toDate);
  if (accountIDs) params.append("account_ids", accountIDs);

  try {
    const res = await fetch(
      `${API_BASE_URL}/api/v1/export/meta-receipts?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    handleResponseError(res);

    const finalName = createFilename(fromDate, toDate);
    handleDownload(await res.blob(), finalName);
  } catch (err) {
    throw new Error(`Could not pass to json: ${err.message}`);
  }
}

export async function apiLogout() {
  await fetch("/api/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  localStorage.removeItem("token");
}
