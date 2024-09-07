import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { object, string } from "yup";
import CustomInput from "../components/CustomInput";
import {
  createColors,
  getColor,
  resetState,
  updateColors,
} from "../features/color/colorSlice";

let colorSchema = object({
  title: string().required("Required"),
  description: string().required("Required"),
});

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getColorId = location.pathname.split("/")[3];

  const newColor = useSelector((state) => state.color);

  const {
    isSuccess,
    isError,
    isLoading,
    createdColor,
    fetchedColorT,
    fetchedColorD,
    updatedColor,
  } = newColor;

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId]);

  useEffect(() => {
    if (isSuccess && (createdColor || updatedColor)) {
      toast.success("🦄 Success!");
      navigate("/admin/color-list");
    }
    if (isError) {
      toast.error("🦄 Oops-a-daisy!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: fetchedColorT || "",
      description: fetchedColorD || "",
    },

    validationSchema: colorSchema,

    onSubmit: (values) => {
      if (getColorId !== undefined) {
        const data = { id: getColorId, colorData: values };
        dispatch(updateColors(data));
        dispatch(resetState());
      } else {
        dispatch(createColors(values));
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
        {getColorId !== undefined ? "Edit" : "Add"} Color
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Enter Color"
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
            id="color"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <CustomInput
            type="text"
            label="Enter Description"
            name="description"
            onCh={formik.handleChange("description")}
            onBl={formik.handleBlur("description")}
            val={formik.values.description}
            id="description"
          />
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            {getColorId !== undefined ? "Edit" : "Add"} Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
