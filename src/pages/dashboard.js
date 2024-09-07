import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Column } from "@ant-design/plots";
import { Table, Tooltip } from "antd";
import {
  getAllMonthlyOrders,
  getAllYearlyStats,
  getOrders,
} from "../features/auth/authSlice";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    align: "center",
    width: 100,
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    // onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Products",
    dataIndex: "products",
    align: "center",
    // onFilter: (value, record) => record.order.indexOf(value) === 0,
    elipsis: {
      showTitle: false,
    },
    render: (products) => (
      <Tooltip placement="topLeft" title={products}>
        {products}
      </Tooltip>
    ),
  },
  {
    title: "Order #",
    dataIndex: "orderNum",
    align: "center",
    width: 100,
    sorter: (a, b) => a.orderNum - b.orderNum,
  },
  {
    title: "Order Total ($)",
    dataIndex: "orderTot",
    align: "center",
    width: 150,
    sorter: (a, b) => a.orderTot - b.orderTot,
  },
  {
    title: "Order Status",
    width: 100,
    align: "center",
    dataIndex: "orderStat",
    // onFilter: (value, record) => record.orderStat.indexOf(value) === 0,
  },
  {
    title: "Address",
    dataIndex: "address",
    align: "center",
    elipsis: {
      showTitle: false,
    },
    render: (address) => (
      <Tooltip placement="topLeft" title={address}>
        {address}
      </Tooltip>
    ),
    // onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const monthlyState = useSelector((state) => state.auth?.monthlyOrders);
  const yearlyState = useSelector((state) => state.auth?.yearlyStats);
  const ordersState = useSelector((state) => state.auth?.orders.orders);
  const [monthlyData, setMonthlyData] = useState([]);
  const [monthlySalesData, setMonthlySalesData] = useState([]);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    dispatch(getAllMonthlyOrders());
    dispatch(getAllYearlyStats());
    dispatch(getOrders());
  }, []);

  useEffect(() => {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let data = [];
    let monthlyOrderCount = [];
    if (monthlyState !== undefined) {
      for (let index = 0; index < monthlyState.length; index++) {
        const element = monthlyState[index];
        data.push({
          type: monthNames[element?._id?.month],
          income: element?.amount,
        });
        monthlyOrderCount.push({
          type: monthNames[element?._id?.month],
          sales: element?.count,
        });
      }
    }
    setMonthlyData(data);
    setMonthlySalesData(monthlyOrderCount);

    const tableData = [];

    if (ordersState !== undefined) {
      for (let index = 0; index < ordersState?.length; index++) {
        const element = ordersState[index];
        const productData = [];
        for (let j = 0; j < element.orderItems.length; j++) {
          const element1 = element.orderItems[j];
          productData.push(
            `"${element1.product.title}" - ${element1.color.description} - ${element1.quantity} pieces`
          );
        }
        tableData.push({
          key: index,
          name: `${element.user.firstname} ${element.user.lastname}`,
          products: productData.join("; "),
          orderNum: Number([index]) + 1,
          orderTot: element.totalPriceAfterDiscount,
          orderStat: element.orderStatus,
          address: `${element.shippingInfo.address} ${element.shippingInfo.city} ${element.shippingInfo.state} ${element.shippingInfo.pincode}`,
        });
      }
      setOrderData(tableData);
    }
  }, [monthlyState, ordersState]);

  const config = {
    data: monthlyData,
    xField: "type",
    yField: "income",
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  const configSales = {
    data: monthlySalesData,
    xField: "type",
    yField: "sales",
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc-p">Total Income</p>{" "}
            <h4 className="mb-0 sub-title">${yearlyState?.[0]?.amount}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0 desc-p">Income this Year</p>
          </div>
        </div>
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc-p">Total Sales</p>{" "}
            <h4 className="mb-0  sub-title">{yearlyState?.[0]?.count}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0 desc-p">Sales this Year</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between gap-3">
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-4 title">Income Stats</h3>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-4 title">Sales Stats</h3>
          <div>
            <Column {...configSales} />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4 title">Recent Orders</h3>
        <div>
          <Table
            columns={columns}
            dataSource={orderData}
            onChange={onChange}
            scroll={{
              x: 1500,
              y: 300,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
