import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { object, string } from "yup";
import CustomInput from "../components/CustomInput";
import {
  createBrands,
  getBrand,
  resetState,
  updateBrands,
} from "../features/brand/brandSlice";

let brandSchema = object({
  title: string().required("Required"),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getBrandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.brand);

  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    fetchedBrand,
    updatedBrand,
  } = newBrand;

  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getBrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && (createdBrand || updatedBrand)) {
      toast.success("🦄 Success!");
      navigate("/admin/brand-list");
    }
    if (isError) {
      toast.error("🦄 Oops-a-daisy!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: fetchedBrand || "",
    },

    validationSchema: brandSchema,

    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, brandData: values };
        dispatch(updateBrands(data));
        dispatch(resetState());
      } else {
        dispatch(createBrands(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getBrandId !== undefined ? "Edit" : "Add"} Brand
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Brand"
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
            id="brand"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            {getBrandId !== undefined ? "Edit" : "Add"} Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
