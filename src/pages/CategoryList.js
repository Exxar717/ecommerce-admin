import React, { useEffect, useState  } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  deleteCategories,
  resetState,
} from "../features/category/categorySlice";
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

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setCategoryId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);
  const categoryState = useSelector((state) => state.category.categories);
  const tableData = [];
  for (let i = 0; i < categoryState.length; i++) {
    if (categoryState[i].role !== "admin") {
      tableData.push({
        key: i + 1,
        title: categoryState[i].title,
        action: (
          <>
            <Link
              className="fs-3 text-danger"
              to={`/admin/category/${categoryState[i]._id}`}
            >
              <RiEdit2Line />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(categoryState[i]._id)}
            >
              <RiDeleteBin2Line />
            </button>
          </>
        ),
      });
    }
  }

  const deleteCategory = (e) => {
    dispatch(deleteCategories(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 1000);
  };

  return (
    <div>
      <h3 className="mb-4 title">Category List</h3>
      <div>
        <Table columns={columns} dataSource={tableData} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCategory(categoryId);
        }}
        title="Sure?"
      />
    </div>
  );
};

export default CategoryList;
