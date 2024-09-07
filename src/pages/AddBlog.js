import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { object, string } from "yup";
import { toast } from "react-toastify";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { delImg, showImgs, uploadImg } from "../features/upload/uploadSlice";
import { getBlogCats } from "../features/blogCategory/blogCatSlice";
import {
  createBlogs,
  getBlog,
  resetState,
  updateBlogs,
} from "../features/blog/blogSlice";

let userSchema = object({
  title: string().required("Required"),
  description: string().required("Required"),
  category: string().required("Required"),
});

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogCats());
  }, []);

  const blogCatState = useSelector((state) => state.blogCat.blogCats);
  const imgState = useSelector((state) => state.upload.images);
  const blogState = useSelector((state) => state.blog);

  const {
    isSuccess,
    isError,
    isLoading,
    createdBlog,
    fetchedBlogT,
    fetchedBlogD,
    fetchedBlogC,
    fetchedBlogI,
    updatedBlog,
  } = blogState;

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getBlog(getBlogId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogId]);

  useEffect(() => {
    if (isSuccess && (createdBlog || updatedBlog)) {
      toast.success("🦄 Success!");
      navigate("/admin/blogs-list");
    }
    if (isError) {
      toast.error("🦄 Oops-a-daisy!");
    }
  }, [isSuccess, isError, isLoading]);

  useEffect(() => {
    formik.values.images = imgState;
  }, [imgState]);

  const formik = useFormik({
    initialValues: {
      title: fetchedBlogT || "",
      description: fetchedBlogD || "",
      category: fetchedBlogC || "",
      images: "",
    },
    enableReinitialize: true,

    validationSchema: userSchema,

    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateBlogs(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogs(values));
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
        {getBlogId !== undefined ? "Edit" : "Add"} Blog
      </h3>
      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <CustomInput
              type="text"
              label="Enter blog Title"
              name="title"
              onCh={formik.handleChange("title")}
              onBl={formik.handleBlur("title")}
              val={formik.values.title}
            />
          </div>
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <select
            name="blogCategory"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3 mt-3"
            id=""
          >
            <option value="" disabled>
              Select Blog Category
            </option>
            {blogCatState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <ReactQuill
            theme="snow"
            name="description"
            onChange={formik.handleChange("description")}
            value={formik.values.description}
          />
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <div className="bg-white border-1 p-5 text-center mt-3">
            {getBlogId !== undefined ? (
              "Image upload/correction is impossible in editing mode. Please redo the blog if you accidentally uploaded a wrong image"
            ) : (
              <Dropzone
                onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>
                        Drag 'n' drop some files here, or click to select files
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
            )}
          </div>
          <div className="showimages d-flex flex-wrap gap-3 mt-3">
            {getBlogId !== undefined
              ? fetchedBlogI?.map((i, j) => {
                  return (
                    <div className="position-relative" key={j}>
                      <img src={i.url} alt="" width={200} height={200} />
                    </div>
                  );
                })
              : imgState.map((i, j) => {
                  return (
                    <div className="position-relative" key={j}>
                      <button
                        type="button"
                        onClick={() => dispatch(delImg(i.public_id))}
                        className="btn-close position-absolute"
                        style={{ top: "10px", right: "10px" }}
                      ></button>
                      <img src={i.url} alt="" width={200} height={200} />
                    </div>
                  );
                })}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            {getBlogId !== undefined ? "Edit" : "Add"} Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
