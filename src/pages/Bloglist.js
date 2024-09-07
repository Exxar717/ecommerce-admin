import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlogs, getBlogs, resetState } from "../features/blog/blogSlice";
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
    title: "Description",
    dataIndex: "description",
    sorter: (a, b) => a.description.length - b.description.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Number of views",
    dataIndex: "numViews",
    sorter: (a, b) => a.numViews.length - b.numViews.length,
  },
  {
    title: "Author",
    dataIndex: "author",
    sorter: (a, b) => a.author.length - b.author.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BlogList = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBlogId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, []);
  const blogState = useSelector((state) => state.blog.blogs);
  const tableData = [];
  for (let i = 0; i < blogState.length; i++) {
    if (blogState[i].role !== "admin") {
      tableData.push({
        key: i + 1,
        title: blogState[i].title,
        description: blogState[i].description,
        category: blogState[i].category,
        numViews: blogState[i].numViews,
        author: blogState[i].author,
        action: (
          <>
            <Link className="fs-3 text-danger" to={`/admin/add-blog/${blogState[i]._id}`}>
              <RiEdit2Line />
            </Link>
            <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={() => showModal(blogState[i]._id)}>
              <RiDeleteBin2Line />
            </button>
          </>
        ),
      });
    }
  }

  const deleteBlog = (e) => {
    dispatch(deleteBlogs(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    }, 1000);
  };

  return (
    <div>
      <h3 className="mb-4 title">Blog List</h3>
      <div>
        <Table columns={columns} dataSource={tableData} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBlog(blogId);
        }}
        title="Sure?"
      />
    </div>
  );
};

export default BlogList;
