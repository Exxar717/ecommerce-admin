import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteColors,
  getColors,
  resetState,
} from "../features/color/colorSlice";
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
    title: "Action",
    dataIndex: "action",
  },
];

const ColorList = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setColorId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getColors());
  }, []);

  const colorState = useSelector((state) => state.color.colors);
  const tableData = [];
  for (let i = 0; i < colorState.length; i++) {
    if (colorState[i].role !== "admin") {
      tableData.push({
        key: i + 1,
        title: colorState[i].title,
        description: colorState[i].description,
        action: (
          <>
            <Link
              className="fs-3 text-danger"
              to={`/admin/color/${colorState[i]._id}`}
            >
              <RiEdit2Line />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(colorState[i]._id)}
            >
              <RiDeleteBin2Line />
            </button>
          </>
        ),
      });
    }
  }

  const deleteColor = (e) => {
    dispatch(deleteColors(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 1000);
  };

  return (
    <div>
      <h3 className="mb-4 title">Color List</h3>
      <div>
        <Table columns={columns} dataSource={tableData} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteColor(colorId);
        }}
        title="Sure?"
      />
    </div>
  );
};

export default ColorList;
