import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrders,
  getOrders,
  resetState,
  updateSingleOrderStatus,
} from "../features/auth/authSlice";
import { Link } from "react-router-dom";
// import { RiEdit2Line, RiDeleteBin2Line } from "react-icons/ri";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const OrderList = () => {
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setOrderId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state.auth.orders.orders);
  const tableData = [];
  if (orderState !== undefined) {
    for (let i = 0; i < orderState.length; i++) {
      tableData.push({
        key: i + 1,
        name: `${orderState[i]?.user?.firstname} ${orderState[i]?.user?.lastname}`,
        product: (
          <Link to={`/admin/order/${orderState[i]._id}`}>View Order</Link>
        ),
        amount: orderState[i]?.totalPrice,
        date: new Date(orderState[i].createdAt).toLocaleString(),
        action: (
          <>
            <select
              name=""
              defaultValue={orderState[i].orderStatus}
              onChange={(e) => updateAnOrderStatus(orderState[i]?._id,e.target.value)}
              className="form-control form-select"
              id=""
            >
              <option value="Ordered" disabled selected>
                Ordered
              </option>
              <option value="Processed">Processed</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
            {/* <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={() => showModal(orderState[i]._id)}>
              <RiDeleteBin2Line />
            </button></> */}
          </>
        ),
      });
    }
  }

  const updateAnOrderStatus = (a,b) => {
    dispatch(updateSingleOrderStatus({id:a,status:b}));
  };

  const deleteOrder = (e) => {
    dispatch(deleteOrders(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getOrders());
    }, 1000);
  };

  return (
    <div>
      <h3 className="mb-4 title">Order List</h3>
      <div>
        <Table columns={columns} dataSource={tableData} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteOrder(orderId);
        }}
        title="Sure?"
      />
    </div>
  );
};

export default OrderList;
