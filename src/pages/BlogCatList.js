import React, { useEffect, useState  } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlogCats,
  deleteBlogCats,
  resetState,
} from "../features/blogCategory/blogCatSlice";
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
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BlogCatList = () => {
  const [open, setOpen] = useState(false);
  const [blogCatId, setBlogCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBlogCatId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogCats());
  }, []);
  const blogCatState = useSelector((state) => state.blogCat.blogCats);
  const tableData = [];
  for (let i = 0; i < blogCatState.length; i++) {
    if (blogCatState[i].role !== "admin") {
      tableData.push({
        key: i + 1,
        title: blogCatState[i].title,
        action: (
            <><Link className="fs-3 text-danger" to={`/admin/blogs-category/${blogCatState[i]._id}`}>
              <RiEdit2Line />
            </Link>
            <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={() => showModal(blogCatState[i]._id)}>
              <RiDeleteBin2Line />
            </button></>
        ),
      });
    }
  }

  const deleteBlogCat = (e) => {
    dispatch(deleteBlogCats(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogCats());
    }, 1000);
  };

  return (
    <div>
      <h3 className="mb-4 title">BlogCat List</h3>
      <div>
        <Table columns={columns} dataSource={tableData} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBlogCat(blogCatId);
        }}
        title="Sure?"
      />
    </div>
  );
};

export default BlogCatList;