import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getEnquiry, resetState, updateEnquiries } from "../features/enquiries/enquirySlice";
import { RiArrowGoBackLine } from "react-icons/ri";

const ViewEnquiry = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getEnquiryId = location.pathname.split("/")[3];

  const newEnquiry = useSelector((state) => state.enquiry);

  const {
    updatedEnquiry,
    fetchedEnquiryN,
    fetchedEnquiryE,
    fetchedEnquiryM,
    fetchedEnquiryC,
    fetchedEnquiryS,
  } = newEnquiry;

  useEffect(() => {
    dispatch(getEnquiry(getEnquiryId));
  }, [getEnquiryId]);

  const goBack = () => {
    navigate(-1);
  };

  const setEnquiryStatus = (e, i) => {
    const data = { id: i, enquiryData: e };
    dispatch(updateEnquiries(data));
    dispatch(resetState());
    setTimeout(() => {
        dispatch(getEnquiry(getEnquiryId));
    }, 300);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">View Enquiry</h3>
        <button
          className="bg-transparent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
          onClick={goBack}
        >
          <RiArrowGoBackLine className="fs-5" />
          Go Back
        </button>
      </div>
      <div className="mb-5 bg-white p-4 d-flex gap-3 flex-column rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0 fw-bold">Name:</h6>
          <p className="mb-0">{fetchedEnquiryN}</p>
        </div>

        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0 fw-bold">Email:</h6>
          <p className="mb-0">
            <a href={`mailto:${fetchedEnquiryE}`}>{fetchedEnquiryE}</a>
          </p>
        </div>

        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0 fw-bold">Mobile:</h6>
          <p className="mb-0">
            <a href={`tel:+7${fetchedEnquiryM}`}>{fetchedEnquiryM}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0 fw-bold">Comment:</h6>
          <p className="mb-0">{fetchedEnquiryC}</p>
        </div>

        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0 fw-bold">Status:</h6>
          <p className="mb-0">{fetchedEnquiryS}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0 fw-bold">Change Status:</h6>
          <div>
            <select
              name=""
              defaultValue={fetchedEnquiryS ? fetchedEnquiryS : "Submitted"}
              className="form-control form-select"
              id=""
              onChange={(e) =>
                setEnquiryStatus(e.target.value, getEnquiryId)
              }
            >
              <option value="Submitted">Submitted</option>
              <option value="Contacted">Contacted</option>
              <option value="Processing">Processing</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEnquiry;
