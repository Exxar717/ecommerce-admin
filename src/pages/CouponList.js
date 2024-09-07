import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCoupons,
  getCoupons,
  resetState,
} from "../features/coupon/couponSlice";
import { Link } from "react-router-dom";
import { RiEdit2Line, RiDeleteBin2Line } from "react-icons/ri";
import CustomModal from "../components/CustomModal";

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
    title: "Expiring",
    dataIndex: "expiring",
    sorter: (a, b) => a.expiring.length - b.expiring.length,
    defaultSortOrder: "descending",
  },
  {
    title: "Discount",
    dataIndex: "discount",
    sorter: (a, b) => a.discount.length - b.discount.length,
    defaultSortOrder: "descending",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const CouponList = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setCouponId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCoupons());
  }, []);
  const couponState = useSelector((state) => state.coupon.coupons);
  const tableData = [];
  for (let i = 0; i < couponState.length; i++) {
    if (couponState[i].role !== "admin") {
      tableData.push({
        key: i + 1,
        name: couponState[i].name,
        expiring: new Date(couponState[i].expiring).toLocaleString(),
        discount: couponState[i].discount,
        action: (
          <>
            <Link
              className="fs-3 text-danger"
              to={`/admin/add-coupon/${couponState[i]._id}`}
            >
              <RiEdit2Line />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(couponState[i]._id)}
            >
              <RiDeleteBin2Line />
            </button>
          </>
        ),
      });
    }
  }

  const deleteCoupon = (e) => {
    dispatch(deleteCoupons(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getCoupons());
    }, 1000);
  };

  return (
    <div>
      <h3 className="mb-4 title">Coupon List</h3>
      <div>
        <Table columns={columns} dataSource={tableData} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCoupon(couponId);
        }}
        title="Sure?"
      />
    </div>
  );
};

export default CouponList;
