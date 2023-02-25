import React from "react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { writeProductData } from "../api/firebase";
import uploadCloudinary from "../api/uploadCloudinary";
import Button from "../components/ui/Button";
import ProductInput from "../components/ui/ProductInput";

export default function NewProduct() {
  const [productData, setProductData] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState();
  const [success, setSuccess] = useState();
  const handleChange = (e, targetName) => {
    setProductData({ ...productData, [targetName]: e.target.value });
  };
  const handleImgChange = (e) => {
    setFile(e.target.files[0]);
  };
  const queryClient = useQueryClient();
  const writeNewProductData = useMutation(
    ({ productData, imgUrl }) => writeProductData({ ...productData, imgUrl }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]);
      },
    }
  );

  const handleSubmit = (e) => {
    setIsUploading(true);
    e.preventDefault();
    uploadCloudinary(file)
      .then((url) => {
        writeNewProductData.mutate(
          { productData, imgUrl: url },
          {
            onSuccess: () => {
              setSuccess(true);
              setTimeout(() => {
                setSuccess(null);
              }, 4000);
            },
          }
        );
      })
      .finally(() => {
        setIsUploading(null);
      });
  };
  const handleSuccess = () => {
    window.scrollTo(0, 0);
    return <p>✅ 성공적으로 업로드되었습니다!</p>;
  };
  return (
    <div className="flex flex-col items-center gap-3 mt-4">
      <h1 className="text-2xl font-bold">새로운 제품 등록</h1>
      {success && handleSuccess()}
      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt={productData.name}
          className="w-1/2"
        ></img>
      )}

      <form className="px-12" onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => {
            handleImgChange(e);
          }}
          className="w-full px-4 py-5 border-gray-300 border"
          required
        />
        <ProductInput
          placeholder={"제품명"}
          onChange={(e) => {
            handleChange(e, "name");
          }}
          value={productData.name || ""}
        />
        <ProductInput
          number
          placeholder="가격"
          onChange={(e) => {
            handleChange(e, "price");
          }}
          value={productData.price || ""}
        />
        <ProductInput
          placeholder="카테고리"
          onChange={(e) => {
            handleChange(e, "category");
          }}
          value={productData.category || ""}
        />
        <ProductInput
          placeholder="제품 설명"
          onChange={(e) => {
            handleChange(e, "description");
          }}
          value={productData.description || ""}
        />
        <ProductInput
          placeholder="옵션들(콤마(,)로 구분"
          onChange={(e) => {
            handleChange(e, "options");
          }}
          value={productData.options || ""}
        />
        <Button
          text={isUploading ? "업로드중..." : "제품 등록하기"}
          cssOptions={"w-full px-10 py-4"}
        />
      </form>
    </div>
  );
}
