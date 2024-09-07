import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBrands,
  getBrands,
  resetState,
} from "../features/brand/brandSlice";
import { Link } from "react-router-dom";
import { RiEdit2Line, RiDeleteBin2Line } from "react-icons/ri";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
    defaultSortOrder: "descending",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BrandList = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBrandId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  }, []);
  const brandState = useSelector((state) => state.brand.brands);
  const tableData = [];
  for (let i = 0; i < brandState.length; i++) {
    if (brandState[i].role !== "admin") {
      tableData.push({
        key: i + 1,
        title: brandState[i].title,
        action: (
          <>
            <Link
              className="fs-3 text-danger"
              to={`/admin/brand/${brandState[i]._id}`}
            >
              <RiEdit2Line />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(brandState[i]._id)}
            >
              <RiDeleteBin2Line />
            </button>
          </>
        ),
      });
    }
  }

  const deleteBrand = (e) => {
    dispatch(deleteBrands(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
    }, 1000);
  };

  return (
    <div>
      <h3 className="mb-4 title">Brand List</h3>
      <div>
        <Table columns={columns} dataSource={tableData} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBrand(brandId);
        }}
        title="Sure?"
      />
    </div>
  );
};

export default BrandList;
