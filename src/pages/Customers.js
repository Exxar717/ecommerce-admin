import React, { useEffect } from 'react';
import { Table } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/customers/customerSlice';

const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      defaultSortOrder: "descending",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      title: "Cart",
      dataIndex: "cart",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Wishlist",
      dataIndex: "wishlist",
    },
  ];
    
const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const customerState = useSelector((state) => state.customer.customers);
  const tableData = [];
  for (let i = 0; i < customerState.length; i++) {
    if (customerState[i].role !== "admin") {
      tableData.push({
        key: i + 1,
        name: customerState[i].firstname + " " + customerState[i].lastname,
        email: customerState[i].email,
        mobile: customerState[i].mobile,
        cart: customerState[i].cart,
        address: customerState[i].address,
        wishlist: customerState[i].wishlist,
      });
    }
  }
  return (
    <div>
        <h3 className="mb-4 title">Customers</h3>
        <div>
        <Table columns={columns} dataSource={tableData} />
        </div>
    </div>
  )
}

export default Customers