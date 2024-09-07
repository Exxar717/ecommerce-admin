import React, { useEffect } from "react";
import { Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import { RiEdit2Line, RiDeleteBin2Line } from "react-icons/ri";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
    defaultSortOrder: "descending",
  },
  {
    title: "Description",
    dataIndex: "description",
    sorter: (a, b) => a.description.length - b.description.length,
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Sold",
    dataIndex: "sold",
  },
  {
    title: "Color",
    dataIndex: "color",
    render: (_, { color }) => (
      <>
      {color.map((item)=> {
        let color = item.title;
        return (
          <Tag color={color} key={item._id}>
            {item.description}
          </Tag>
        );
      })}
      </>
    ),
  },
  {
    title:"Tags",
    dataIndex:"tags",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state.product.products);
  const tableData = [];
  for (let i = 0; i < productState.length; i++) {
    if (productState[i].role !== "admin") {
      tableData.push({
        key: i + 1,
        title: productState[i].title,
        description: productState[i].description,
        price: productState[i].price,
        category: productState[i].category,
        brand: productState[i].brand,
        quantity: productState[i].quantity,
        sold: productState[i].sold,
        color: productState[i].color,
        tags: productState[i].tags,
        action: (
            <><Link className="fs-3 text-danger" to="/">
              <RiEdit2Line />
            </Link>
            <Link className="ms-3 fs-3 text-danger" to="/">
              <RiDeleteBin2Line />
            </Link></>
        ),
      });
    }
  }
  return (
    <div>
      <h3 className="mb-4 title">Product List</h3>
      <div>
        <Table columns={columns} dataSource={tableData} />
      </div>
    </div>
  );
};

export default ProductList;
