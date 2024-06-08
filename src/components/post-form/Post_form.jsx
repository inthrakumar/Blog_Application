import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import Real_time_editor from "../Real_time_editor";
import Select from "../Select";
import Database_Service_Object from "../../appwrite/data_config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Post_form({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post.content || "",
        slug: post?.slug || "",
        status: post.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await Database_Service_Object.uploadFile(data.image[0])
        : null;

      if (file) {
        Database_Service_Object.deleteFile(post.image_feature);
      }
      const dbPost = await Database_Service_Object.updatePost(post.id, {
        ...data,
        image_feature: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await Database_Service_Object.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.image_feature = fileId;
        const dbPost = await Database_Service_Object.createPost({
          ...data,
          userId: userData.id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
  }, []);

  React.useEffect(() => {
    watch((value, { name }) => {
      if (name === "title") {
        {
          setValue("slug", slugTransform(value.title), {
            shouldValidate: true,
          });
        }
      }
    });
  }, [watch, slugTransform, setValue]);
  return (
    <div>
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
          <Input
            label="Title"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
        </div>
        <Real_time_editor
          label="Content"
          name="content"
          defaultValues={getValues("content")}
        />
        <div className="1/3 px-2">
          <Input
            label="Featured Image"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={Database_Service_Object.getFilePreview(post.image_feature)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
        </div>
        <div>
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className="w-full"
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Post_form;
