import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { object, string, date, number } from "yup";
import CustomInput from "../components/CustomInput";
import {
  createCoupons,
  getCoupon,
  resetState,
  updateCoupons,
} from "../features/coupon/couponSlice";

let couponSchema = object({
  name: string().required("Required"),
  expiring: date().required("Required"),
  discount: number().required("Required"),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCouponId = location.pathname.split("/")[3];

  const newCoupon = useSelector((state) => state.coupon);

  const {
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    fetchedCouponN,
    fetchedCouponE,
    fetchedCouponD,
    updatedCoupon,
  } = newCoupon;

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getCoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId]);

  useEffect(() => {
    if (isSuccess && (createdCoupon || updatedCoupon)) {
      toast.success("🦄 Success!");
      navigate("/admin/coupons-list");
    }
    if (isError) {
      toast.error("🦄 Oops-a-daisy!");
    }
  }, [isSuccess, isError, isLoading]);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: fetchedCouponN || "",
      expiring: fetchedCouponE || "",
      discount: fetchedCouponD || "",
    },

    validationSchema: couponSchema,

    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        dispatch(updateCoupons(data));
        dispatch(resetState());
      } else {
        dispatch(createCoupons(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 name">
        {getCouponId !== undefined ? "Edit" : "Add"} Coupon
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Coupon"
            name="name"
            onCh={formik.handleChange("name")}
            onBl={formik.handleBlur("name")}
            val={formik.values.name}
            id="coupon"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="datetime-local"
            label={getCouponId !== undefined ? new Date(fetchedCouponE).toLocaleString() : "Enter Date"} 
            name="expiring"
            onCh={formik.handleChange("expiring")}
            onBl={formik.handleBlur("expiring")}
            val={formik.values.expiring}
            id="coupon"
          />
          <div className="error">
            {formik.touched.expiring && formik.errors.expiring}
          </div>
          <CustomInput
            type="number"
            label="Enter Amount"
            name="discount"
            onCh={formik.handleChange("discount")}
            onBl={formik.handleBlur("discount")}
            val={formik.values.discount}
            id="coupon"
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            {getCouponId !== undefined ? "Edit" : "Add"} Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
