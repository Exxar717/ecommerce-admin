import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getEnquiries,
  deleteEnquiries,
  resetState,
  updateEnquiries,
} from "../features/enquiries/enquirySlice";
import { Link } from "react-router-dom";
import { RiEyeLine, RiDeleteBin2Line } from "react-icons/ri";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Bane",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => a.email.length - b.email.length,
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
    sorter: (a, b) => a.mobile.length - b.mobile.length,
  },
  {
    title: "Comment",
    dataIndex: "comment",
    sorter: (a, b) => a.comment.length - b.comment.length,
  },
  {
    title: "Status",
    dataIndex: "status",
    sorter: (a, b) => a.status.length - b.status.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const EnquiryList = () => {
  const [open, setOpen] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setEnquiryId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, []);
  const enquiryState = useSelector((state) => state.enquiry.enquiries);
  const tableData = [];
  for (let i = 0; i < enquiryState.length; i++) {
    if (enquiryState[i].role !== "admin") {
      tableData.push({
        key: i + 1,
        name: enquiryState[i].name,
        email: enquiryState[i].email,
        mobile: enquiryState[i].mobile,
        comment: enquiryState[i].comment,
        status: (
          <>
            <select
              name=""
              defaultValue={
                enquiryState[i].status ? enquiryState[i].status : "Submitted"
              }
              className="form-control form-select"
              id=""
              onChange={(e) =>
                setEnquiryStatus(e.target.value, enquiryState[i]._id)
              }
            >
              <option value="Submitted">Submitted</option>
              <option value="Contacted">Contacted</option>
              <option value="Processing">Processing</option>
              <option value="Resolved">Resolved</option>
            </select>
          </>
        ),
        action: (
          <>
            <Link
              className="fs-3 text-danger"
              to={`/admin/view-enquiry/${enquiryState[i]._id}`}
            >
              <RiEyeLine />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(enquiryState[i]._id)}
            >
              <RiDeleteBin2Line />
            </button>
          </>
        ),
      });
    }
  }

  const setEnquiryStatus = (e, i) => {
    const data = { id: i, enquiryData: e };
    dispatch(updateEnquiries(data));
  };

  const deleteEnquiry = (e) => {
    dispatch(deleteEnquiries(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 1000);
  };

  return (
    <div>
      <h3 className="mb-4 title">Enquiry List</h3>
      <div>
        <Table columns={columns} dataSource={tableData} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteEnquiry(enquiryId);
        }}
        title="Sure?"
      />
    </div>
  );
};

export default EnquiryList;
