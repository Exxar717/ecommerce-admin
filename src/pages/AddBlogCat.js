import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { object, string } from "yup";
import CustomInput from "../components/CustomInput";
import {
  createBlogCats,
  getBlogCat,
  updateBlogCats,
  resetState,
} from "../features/blogCategory/blogCatSlice";


let blogCatSchema = object({
  title: string().required("Required"),
});

const AddBlogCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogCatId = location.pathname.split("/")[3];

  const newBlogCat = useSelector((state) => state.blogCat);

  const {
    isSuccess,
    isError,
    isLoading,
    createdBlogCat,
    fetchedBlogCat,
    updatedBlogCat,
  } = newBlogCat;

  useEffect(() => {
    if (getBlogCatId !== undefined) {
      dispatch(getBlogCat(getBlogCatId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogCatId]);

  useEffect(() => {
    if (isSuccess && (createdBlogCat || updatedBlogCat)) {
      toast.success("🦄 Success!");
      navigate("/admin/blogs-category-list");
    }
    if (isError) {
      toast.error("🦄 Oops-a-daisy!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: fetchedBlogCat || "",
    },

    validationSchema: blogCatSchema,

    onSubmit: (values) => {
      if (getBlogCatId !== undefined) {
        const data = { id: getBlogCatId, blogCatData: values };
        dispatch(updateBlogCats(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogCats(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">{getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Blog Category"
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
            id="blogCat"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            {getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCat;
