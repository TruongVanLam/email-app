// Dữ liệu email giả lập
const mockEmails = Array.from({ length: 200 }, (_, i) => ({
  date: new Date(Date.now() - i * 86400000).toISOString().slice(0, 10),
  accountId: `user${i}@example.com`,
  transactionId: `TX${1000 + i}`,
  payment: (Math.random() * 1000).toFixed(2),
  cardNumber: `**** **** **** ${Math.floor(1000 + Math.random() * 9000)}`,
  referenceNumber: `REF${i + 100}`,
  status: i % 2 === 0 ? "Success" : "Failed",
}));

// Hàm giả lập gọi API để search email theo điều kiện
export function searchEmails({ fromDate, toDate, email }) {
  const from = fromDate
    ? new Date(fromDate)
    : new Date(Date.now() - 30 * 86400000);
  const to = toDate ? new Date(toDate) : new Date();

  const filtered = mockEmails.filter((e) => {
    const date = new Date(e.date);
    const matchDate = date >= from && date <= to;
    const matchEmail = email ? e.accountId.includes(email) : true;
    return matchDate && matchEmail;
  });

  return new Promise((resolve) => {
    setTimeout(() => resolve(filtered), 300); // Giả lập độ trễ API
  });
}

// Hàm giả lập export dữ liệu ra excel (chỉ giả lập, thực tế không tạo file)
export function exportEmailsToExcel(data) {
  console.log("Exporting to Excel:", data);
  return new Promise((resolve) => {
    setTimeout(() => resolve("fake-export.xlsx"), 300);
  });
}

export function loginMock(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "admin@example.com" && password === "123456") {
        resolve({ token: "fake-token-123", user: { email } });
      } else {
        reject(new Error("Email hoặc mật khẩu không đúng"));
      }
    }, 500);
  });
}
