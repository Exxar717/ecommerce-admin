import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { object, string } from "yup";
import CustomInput from "../components/CustomInput";
import {
  createCategories,
  getCategory,
  updateCategories,
  resetState,
} from "../features/category/categorySlice";

let categorySchema = object({
  title: string().required("Required"),
});

const AddCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCategoryId = location.pathname.split("/")[3];

  const newCategory = useSelector((state) => state.category);

  const {
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    fetchedCategory,
    updatedCategory,
  } = newCategory;

  useEffect(() => {
    if (getCategoryId !== undefined) {
      dispatch(getCategory(getCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getCategoryId]);

  useEffect(() => {
    if (isSuccess && (createdCategory || updatedCategory)) {
      toast.success("🦄 Success!");
      navigate("/admin/category-list");
    }
    if (isError) {
      toast.error("🦄 Oops-a-daisy!");
    }
  }, [isSuccess, isError, isLoading]);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: fetchedCategory || "",
    },

    validationSchema: categorySchema,

    onSubmit: (values) => {
      if (getCategoryId !== undefined) {
        const data = { id: getCategoryId, categoryData: values };
        dispatch(updateCategories(data));
        dispatch(resetState());
      } else {
        dispatch(createCategories(values));
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
        {getCategoryId !== undefined ? "Edit" : "Add"} Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Category"
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
            id="category"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            {getCategoryId !== undefined ? "Edit" : "Add"} Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCat;
